import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';

import ENV from '@src/common/ENV';
import { NODE_ENVS } from '@src/common';
import { errorHandler } from './middlewares/errorHandler';
import { APIRouter } from './routes/apiRouter';
import { CORS_CONFIG } from './config/CORS';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (ENV.NodeEnv === NODE_ENVS.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NODE_ENVS.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// Add error handler
app.use(errorHandler);

app.use('/api', APIRouter);
/******************************************************************************
                                Export default
******************************************************************************/

export default app;
