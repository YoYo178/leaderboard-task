import jetEnv, { num, str } from 'jet-env';
import { isValueOf } from 'jet-validators';

import { NODE_ENVS } from './index';


/******************************************************************************
                                 Setup
******************************************************************************/

const ENV = jetEnv({
  NodeEnv: isValueOf(NODE_ENVS),
  Port: num,

  MongodbUri: str,
});


/******************************************************************************
                            Export default
******************************************************************************/

export default ENV;
