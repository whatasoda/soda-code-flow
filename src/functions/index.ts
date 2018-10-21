import * as functions from 'firebase-functions';
import { resolveTransform } from './transform';

export const transform = functions.https.onRequest(async (req, res) => {
  const { status, body } = await resolveTransform(req);
  res.status(status).send(body);
});
