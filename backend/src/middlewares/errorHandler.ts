import logger from 'jet-logger';
import type { NextFunction, Request, Response } from 'express';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { NodeEnvs } from '@src/common';
import ENV from '@src/common/ENV';

export const errorHandler = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf())
    logger.err(error, true);

  const statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  let errorMessage = 'Unknown error, please try again later.';

  if (error instanceof Error)
    errorMessage = error.message;

  res.status(statusCode).json({ error: errorMessage });
};