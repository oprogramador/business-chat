import createRoutesFromModel from 'business-chat-backend/routes/createRoutesFromModel';
import express from 'express';
import { teamModel } from 'business-chat-backend/model/Models';

export default createRoutesFromModel(express.Router(), teamModel);
