import ExpressBunyanLogger from 'express-bunyan-logger';
import addRoutes from 'business-chat-backend/routes/addRoutes';
import config from 'business-chat-backend/config';
import { configureDatabase } from 'business-chat-backend/model/Models';
import express from 'express';
import { logger } from 'business-chat-backend/servicesManager';

configureDatabase(config.db.name);

const PORT = 3000;

const app = express();
app.use(ExpressBunyanLogger());
addRoutes(app);
app.get('/', (req, res) => res.json({ success: true }));
app.listen(PORT);

logger.info(`Running on http://localhost: ${PORT}`);
