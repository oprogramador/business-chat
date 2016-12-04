import { createApp } from 'js-abstract-synchronizer';
import getAuthenticationMiddlewares from 'business-chat-backend/authentication/getAuthenticationMiddlewares';
import serializer from 'business-chat-backend/services/serializer';

export default ({ loggerMiddleware, port, dbName }) => serializer.configure(dbName)
  .then(() => {
    const app = createApp({
      middlewares: [
        ...getAuthenticationMiddlewares(),
        loggerMiddleware,
      ],
      serializer,
    });
    app.listen(port);

    return app;
  });
