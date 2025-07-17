import logger from 'jet-logger';
import type { NextFunction, Request, Response } from "express";

import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { NodeEnvs } from "@src/common";
import ENV from "@src/common/ENV";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (ENV.NodeEnv !== NodeEnvs.Test.valueOf())
        logger.err(error, true);

    const status = error?.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.message || 'Something went wrong';

    res.status(status).json({ error: message });
}