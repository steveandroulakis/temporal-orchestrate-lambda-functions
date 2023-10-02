import {
  proxyActivities, setHandler, sleep, uuid4
} from '@temporalio/workflow';
import { ResultObj, StateObj, StripeChargeResponse, WorkflowParameterObj } from './interfaces';
import { defineQuery } from '@temporalio/workflow';
import Stripe from 'stripe';

import type * as activities from './activities';

const { createCharge } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    nonRetryableErrorTypes: ['StripeInvalidRequestError']
  }
});

export const getStateQuery = defineQuery<StateObj>('getState');

/** A workflow that simply calls an activity */
export async function moneyTransferWorkflow(workflowParameterObj: WorkflowParameterObj): Promise<ResultObj> {

  let progressPercentage = 25;
  let transferState = "starting";
  let chargeResult: StripeChargeResponse = { chargeId: "" };

  // Query that returns state info to the UI
  setHandler(getStateQuery, () => ({
    progressPercentage: progressPercentage,
    transferState: transferState,
    chargeResult: chargeResult
  }));

  // this sleep is non-blocking!
  await sleep('2 seconds');

  // throw new Error('Something went wrong');

  progressPercentage = 75;
  transferState = "running";

  const idempotencyKey = uuid4();

  chargeResult = await createCharge(idempotencyKey, workflowParameterObj.amountCents);

  await sleep('5 seconds');

  progressPercentage = 100;
  transferState = "finished";

  return { stripeChargeResponse: chargeResult };

}