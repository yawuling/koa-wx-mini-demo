const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const body = require('koa-body');
const cors = require('koa-cors');
const {
  getAccessToken,
  generateSchema,
  querySchema,
  generateUrlLink,
} = require('./lib/wxMini');
const { sleep } = require('./lib/utils');

const app = new Koa();
const router = new Router();

app.use(body({
  multipart: true,
}));
app.use(cors({
  origin: true,
}));

router.get('/api/wx/generateSchema', async (ctx) => {
  const start = Date.now();
  try {
    const access_token = await getAccessToken('1', '2');
    const { data } = await generateSchema({
      access_token,
      jump_wxa: {
        path: 'pages/h5/index',
        query: 'url=xxx'
      },
      is_expire: true,
      expire_type: 1,
      expire_interval: 30,
    });
    const { errcode, errmsg, openlink } = data;

    if (errcode === 0) {
      await sleep(1000);
      ctx.body = {
        errcode: 0,
        url: openlink,
      };
    } else {
      throw new Error(errmsg);
    }
  } catch (e) {
    ctx.body = {
      errcode: -1,
      errmsg: e.message,
    };
  } finally {
    console.warn('---- /api/wx/generateSchema --- duration: ', Date.now() - start);
  }
});

router.get('/api/wx/queryScheme', async (ctx) => {
  const start = Date.now();
  try {
    const { scheme } = ctx.request.query;
    const access_token = await getAccessToken('1', '2');
    const { data } = await querySchema({
      access_token,
      scheme,
    });
    ctx.body = data;
  } catch (e) {
    ctx.body = {
      errcode: -1,
      errmsg: e.message,
    };
  } finally {
    console.warn('---- /api/wx/generateScheme --- duration: ', Date.now() - start);
  }
});

router.get('/api/wx/generateUrlLink', async (ctx) => {
  const start = Date.now();
  try {
    const access_token = await getAccessToken('1', '2');
    const { data } = await generateUrlLink({
      access_token,
      path: 'pages/index/index',
      is_expire: true,
      expire_type: 1,
      expire_interval: 30,
    });
    const { errcode, errmsg, url_link } = data;

    if (errcode === 0) {
      ctx.body = {
        errcode: 0,
        url: url_link,
      };
    } else {
      throw new Error(errmsg);
    }
  } catch (e) {
    ctx.body = {
      errcode: -1,
      errmsg: e.message,
    };
  } finally {
    console.warn('---- /api/wx/generateUrlLink --- duration: ', Date.now() - start);
  }
});

router.get('/h5/wxRedirectSchema', async (ctx) => {
  const start = Date.now();
  try {
    const access_token = await getAccessToken('1', '2');
    const { data } = await generateSchema({
      access_token,
      jump_wxa: {
        path: 'pages/index/index',
      },
      is_expire: true,
      expire_type: 1,
      expire_interval: 30,
    });
    const { errcode, errmsg, openlink } = data;

    if (errcode === 0) {
      ctx.redirect(openlink);
    } else {
      throw new Error(errmsg);
    }
  } catch (e) {
    ctx.body = e.message;
  } finally {
    console.warn('---- /h5/wxRedirectSchema --- duration: ', Date.now() - start);
  }
});

router.get('/h5/wxRedirectLink', async (ctx) => {
  const start = Date.now();
  try {
    const access_token = await getAccessToken('1', '2');
    const { data } = await generateUrlLink({
      access_token,
      path: 'pages/index/index',
      is_expire: true,
      expire_type: 1,
      expire_interval: 30,
    });
    const { errcode, errmsg, url_link } = data;

    if (errcode === 0) {
      ctx.redirect(url_link);
    } else {
      throw new Error(errmsg);
    }
  } catch (e) {
    ctx.body = e.message;
  } finally {
    console.warn('---- /h5/wxRedirectLink --- duration: ', Date.now() - start);
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve('static'));

app.listen(3010, () => {
  console.log('server is running, http://localhost:3010');
});
