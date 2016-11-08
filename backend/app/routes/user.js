import createRoutesFromModel from 'business-chat-backend/routes/createRoutesFromModel';
import express from 'express';
import { userModel } from 'business-chat-backend/model/Models';

export default createRoutesFromModel(express.Router(), userModel);
