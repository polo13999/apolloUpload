export default /* GraphQL */ `
  scalar Upload

  type File {
    fileId: String!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload (file: Upload!): File!
    multipleUpload (files: [Upload!]!): [File!]!
  }
`
