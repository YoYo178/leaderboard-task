import logger from 'jet-logger';

import ENV from '@src/common/ENV';
import server from './server';
import { connectDB } from './common/db';
import mongoose from 'mongoose';


/******************************************************************************
                                  Run
******************************************************************************/


mongoose.connection.once('open', () => {
  logger.info(`Connected to MongoDB (${ENV.NodeEnv || 'NODE_ENV NOT DEFINED!'})`);
  server.listen(ENV.Port, () => logger.info(SERVER_START_MSG));
});

connectDB();

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);

// Start the server
server.listen(ENV.Port, err => {
  if (!!err) {
    logger.err(err.message);
  } else {
    logger.info(SERVER_START_MSG);
  }
});
