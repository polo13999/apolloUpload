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

const app = new Koa()
const router = new KoaRouter()
const schema = graphqlTools.makeExecutableSchema({ typeDefs, resolvers })

router.post(
  '/graphql',
  koaBody(),
  apolloUploadKoa(),
  graphqlServerKoa.graphqlKoa({ schema })
)

app
  .use(cors())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001, error => {
  if (error) throw error
  // eslint-disable-next-line no-console
  console.info(`Serving http://localhost:3001 for 3001.`)
})
