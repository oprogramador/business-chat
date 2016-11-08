import { messageModel, roomModel, teamModel, userModel } from 'business-chat-backend/model/Models';
import bodyParser from 'body-parser';
import createRoutesFromModel from 'business-chat-backend/routes/createRoutesFromModel';
import express from 'express';

export default (app) => {
  app.use(bodyParser.json());
  app.use('/message', createRoutesFromModel(express.Router(), messageModel));
  app.use('/room', createRoutesFromModel(express.Router(), roomModel));
  app.use('/team', createRoutesFromModel(express.Router(), teamModel));
  app.use('/user', createRoutesFromModel(express.Router(), userModel));
};
