import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as path from 'path';
import { resolveTransform } from '../functions/transform';

const port = process.env.NODE_ENV || 3000;

export const start = () => {
  const server = new Koa();
  const router = new Router();

  server.use(bodyparser());
  router.post('/transform', async (ctx) => {
    const { status, body } = await resolveTransform(ctx.request as any);
    ctx.status = status;
    ctx.response.body = body;
  });

  server.use(router.routes());
  server.use(serve(path.resolve(__dirname, '../../dist/app')));
  server.listen(port, () => {
    // tslint:disable-next-line
    console.log(`Server is ready on http://localhost:${port}`);
  });
};
