import * as graphqlTools from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'



export const schema = graphqlTools.makeExecutableSchema({ typeDefs, resolvers })
