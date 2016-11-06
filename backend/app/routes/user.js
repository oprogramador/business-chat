import HTTPStatus from 'http-status';
import express from 'express';
import { userModel } from 'business-chat-backend/model/Models';

const router = express.Router();

router.post('/', (req, res) => {
  userModel.save(req.body)
    .then(result => res.status(HTTPStatus.CREATED).json(result))
    .catch(() => res.status(HTTPStatus.BAD_REQUEST).end());
});

export default router;
