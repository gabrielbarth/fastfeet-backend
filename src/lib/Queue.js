import Bee from 'bee-queue';

import NewDeliveryMail from '../app/jobs/NewDeliveryMail';
import CancelDeliveryMail from '../app/jobs/CancelDeliveryMail';
import redisConfig from '../config/redis';

// array of email types
const jobs = [NewDeliveryMail, CancelDeliveryMail];

// foreach service/background job there is a specific queueails
class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // destructuring job -> including each job in queue
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // method to add new jobs inner each queue
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // processing queues
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
