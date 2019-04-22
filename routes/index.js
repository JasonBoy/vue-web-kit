'use strict';

const Router = require('koa-router');
const koaBody = require('koa-body');
const config = require('../config/env');
const utils = require('../config/utils');
const appPrefix = utils.normalizeTailSlash(config.getAppPrefix());

const router = new Router({
  prefix: appPrefix,
});

router.use(async function(ctx, next) {
  ctx.set('Cache-Control', 'no-cache');
  await next();
});

router.get('/', async function(ctx) {
  ctx.state = {
    title: 'using nunjucks template',
  };

  await ctx.render('index');
});

router.post('/user', koaBody({ multipart: true }), async function(ctx) {
  const body = ctx.request.body;
  console.log(body);
  ctx.body = { result: body };
});

module.exports = router;
