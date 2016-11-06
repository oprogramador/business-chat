import HTTPStatus from 'http-status';
import express from 'express';
import { teamModel } from 'business-chat-backend/model/Models';

const router = express.Router();

router.post('/', (req, res) => {
  teamModel.save(req.body)
    .then(result => res.status(HTTPStatus.CREATED).json(result))
    .catch(() => res.status(HTTPStatus.BAD_REQUEST).end());
});

router.get('/:id', (req, res) => {
  teamModel.find(req.params.id)
    .then(result => res.status(HTTPStatus.OK).json(result))
    .catch(() => res.status(HTTPStatus.NOT_FOUND).end());
});

export default router;
