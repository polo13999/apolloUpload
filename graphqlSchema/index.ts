import * as graphqlTools from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'


console.log('=====')

//console.log(typeDefs)
console.log(resolvers)

export const schema = graphqlTools.makeExecutableSchema({ typeDefs, resolvers })
