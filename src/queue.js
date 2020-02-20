import 'dotenv/config';

import Queue from './lib/Queue';

Queue.processQueue();

/**
 * The queue proccess is executed indepentend of application execution.
 * It allows that queue does not harm the application performance.
 * Allows that different processes be excetuted in distinct and suitable
 * processors for it;
 */
