import ExpressBunyanLogger from 'express-bunyan-logger';
import express from 'express';
import { logger } from 'servicesManager';

const PORT = 3000;

const app = express();
app.use(ExpressBunyanLogger());
app.get('/', (req, res) => res.json({ success: true }));
app.listen(PORT);

logger.info(`Running on http://localhost: ${PORT}`);
