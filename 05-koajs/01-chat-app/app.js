const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const clients = new Set();

router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;

  if (message) {
    clients.forEach((resolve) => {
      resolve(message);
    });

    clients.clear();

    ctx.status = 200;
    ctx.body = 'OK';
  } else {
    ctx.status = 400;
    ctx.body = 'Bad Request';
  }
});

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve, reject) => {
    clients.add(resolve);

    ctx.res.on('close', () => {
      clients.delete(resolve);

      resolve();
    });
  });

  ctx.status = 200;
  ctx.body = message;
});

app.use(router.routes());

module.exports = app;
