import ExpressBunyanLogger from 'express-bunyan-logger';
import addRoutes from 'business-chat-backend/routes/addRoutes';
import config from 'business-chat-backend/config';
import express from 'express';
import { logger } from 'business-chat-backend/servicesManager';

const app = express();
app.use(ExpressBunyanLogger());
addRoutes(app);
app.get('/', (req, res) => res.json({ success: true }));
app.listen(config.http.port);

logger.info(`Running on http://localhost: ${config.http.port}`);
