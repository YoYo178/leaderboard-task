import logger from 'jet-logger';
import type { NextFunction, Request, Response } from 'express';

import HTTP_STATUS_CODES from '@src/common/HTTP_STATUS_CODES';
import { NODE_ENVS } from '@src/common';
import ENV from '@src/common/ENV';

export const errorHandler = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (ENV.NodeEnv !== NODE_ENVS.Test.valueOf())
    logger.err(error, true);

  const statusCode = HTTP_STATUS_CODES.InternalServerError;
  let errorMessage = 'Unknown error, please try again later.';

  if (error instanceof Error)
    errorMessage = error.message;

  res.status(statusCode).json({ error: errorMessage });
};