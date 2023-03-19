import express from "express";
import expressWs from "express-ws";
import * as crypto from "crypto";
import {WebSocket} from 'ws';
import {IncomingMessage, IUser} from "../types";
import User from "../models/User";
import Message from "../models/Message";

expressWs(express());
const chatRouter = express.Router();
const activeConnections:{[id: string]: WebSocket} = {};

chatRouter.ws('/messenger', async (ws, req, next) => {
  const id = crypto.randomUUID();
  activeConnections[id] = ws;
  let username: IUser | null = null;
  
  try {
    const user = await User.findOne({token: req.query.token});
    const messages = await Message.find().sort({_id: -1}).limit(30).populate('username');
    
    if (user) {
      username = user;
      user.isOnline = true;
      await user.save();
    }

    const newUser = await User.find({isOnline: true});

    if (newUser) {
      Object.keys(activeConnections).forEach((id) => {
        const connection = activeConnections[id];

        connection.send(JSON.stringify({
          type: 'LOGIN',
          payload: {
            username: newUser,
            messages,
          }
        }));
      });
    }

  } catch (e) {
    return next(e);
  }
  
  ws.on('message', async (msg) => {
    const decodedMessage = JSON.parse(msg.toString()) as IncomingMessage;
    switch (decodedMessage.type) {
      case 'SEND_MESSAGES':
        try {
          await Message.create({
            username,
            text: decodedMessage.payload,
          });
        }catch (e) {
          return next(e);
        }
        Object.keys(activeConnections).forEach((id) => {
          const connection = activeConnections[id];
          connection.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            payload: {
              username,
              text: decodedMessage.payload,
            },
          }));
        });
        break;
      case 'EXT':
        try {
          const user = await User.findOne({token: req.query.token});

          if (user) {
            user.isOnline = false;
            username = user;
            await user.save();
          }
        } catch (e) {

        }
        break;

      default:
        console.log('Unknown type: ', decodedMessage.type);
    }
  });

  ws.on('close', async () => {
    delete activeConnections[id];
  });
});

export default chatRouter;