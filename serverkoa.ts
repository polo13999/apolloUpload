const next = require("next");
var port = process.env.NODE_ENV !== "production" ? 3000 : 80;
const dev = process.env.NODE_ENV !== "production";


import * as Koa from 'koa'
import * as cors from 'kcors'
import * as compress from 'koa-compress'
import * as KoaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import { apolloUploadKoa } from 'apollo-upload-server'
import * as graphqlServerKoa from 'graphql-server-koa'
import * as graphqlTools from 'graphql-tools'
import typeDefs from './graphqlSchema/schema'
import resolvers from './graphqlSchema/resolvers'

const router = new KoaRouter()
const schema = graphqlTools.makeExecutableSchema({ typeDefs, resolvers })

const app = next({ dev });
const handle = app.getRequestHandler();


//console.log('schema====')
//console.log(schema)
app.prepare().then(() => {
  const server = new Koa()

  router.post(
    '/graphql',
    koaBody(),
    apolloUploadKoa(),
    graphqlServerKoa.graphqlKoa({ schema })
  )
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })
  server
    .use(cors())
    .use(compress())
    .use(router.routes())
    .use(router.allowedMethods())


  // server.use((req, res, next) => {
  //   return next();
  // });
  //server.use(handle);

  server.listen(port, error => {
    if (error) throw error
    // eslint-disable-next-line no-console
    console.info(`Serving http://localhost:3001 for ${port}.`)
  })
});
