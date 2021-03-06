const Koa = require('koa')
const app = new Koa()


const config = require('./config/' + (process.env.NODE_ENV || 'development'))
global.config = config

const logger = require('koa-logger')

const router = require('./router')
const bodyParser = require('koa-bodyparser')

app.use(async function(ctx, next) {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 86400000);
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  await next()
})

app.use(logger())
app.use(bodyParser())
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.server.port)
