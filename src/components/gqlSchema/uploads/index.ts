import gql from 'graphql-tag'

export const uploadsQuery = gql`
  query uploads {
    uploads {
      fileId
      filename
      encoding
      mimetype
      path
    }
  }
`
