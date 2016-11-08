import HTTPStatus from 'http-status';

export default (router, model) => {
  router.post('/', (req, res) =>
    model.save(req.body)
      .then(result => res.status(HTTPStatus.CREATED).json(result))
      .catch(() => res.status(HTTPStatus.BAD_REQUEST).end())
  );

  router.get('/:id', (req, res) =>
    model.find(req.params.id)
      .then(result => res.status(HTTPStatus.OK).json(result))
      .catch(() => res.status(HTTPStatus.NOT_FOUND).end())
  );

  return router;
};
