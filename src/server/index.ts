import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as bodyparser from 'koa-bodyparser';
import * as path from 'path';
import { transform } from './transform';

const server = new Koa();
const router = new Router();

server.use(bodyparser());

router.post('/transform', async (ctx) => {
  const { code = '' }: { code: string } = (ctx.request.body || {}) as any;
  const result = await transform(code);
  if (result) {
    ctx.response.body = result;
  } else {
    ctx.status = 400;
    ctx.response.body = 'bad request';
  }
});

const staticApp = serve(path.resolve(__dirname, '../app'));
router.get(/\/app\/.*/, async (ctx, next) => {
  const match = ctx.path.match(/\/app(\/.*)/);
  if (!match) {
    return await next();
  }
  ctx.path = match[1];
  await staticApp(ctx, next);
});

server.use(router.routes());
server.listen(3000, () => {
  console.log('Server is ready on http://localhost:3000');
});
