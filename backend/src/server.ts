import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';

import ENV from '@src/common/ENV';
import { NodeEnvs } from '@src/common';
import { errorHandler } from './middlewares/errorHandler';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// Add error handler
app.use(errorHandler);

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
