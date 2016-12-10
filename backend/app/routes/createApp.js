import { createApp } from 'js-abstract-synchronizer';
import serializer from 'business-chat-backend/services/serializer';

export default ({ loggerMiddleware, port, dbName }) => serializer.configure(dbName)
  .then(() => {
    const app = createApp({
      middlewares: [
        loggerMiddleware,
      ],
      serializer,
    });
    app.listen(port);

    return app;
  });
