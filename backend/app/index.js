import ExpressBunyanLogger from 'express-bunyan-logger';
import addRoutes from 'business-chat-backend/routes/addRoutes';
import express from 'express';
import { logger } from 'business-chat-backend/servicesManager';

const PORT = 3000;
const app = express();
app.use(ExpressBunyanLogger());
addRoutes(app);
app.get('/', (req, res) => res.json({ success: true }));
app.listen(PORT);

logger.info(`Running on http://localhost: ${PORT}`);
