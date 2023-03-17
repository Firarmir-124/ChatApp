import express from 'express'
import mongoose from "mongoose";
import cors from 'cors';
import config from "./config";
import usersRouter from "./routes/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('Server ok: ', port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);