export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  isOnline: boolean;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface IncomingMessageAndClient {
  type: string;
  payload: {
    messages,
    username,
  };
}

export interface IncomingNewMessage {
  type: string;
  payload: ChatMessage;
}

export interface IncomingClient {
  type: string;
  payload: User;
}

export interface ChatMessage {
  _id: string;
  text: string;
  username: {
    _id: string;
    displayName: string;
  }
}