import gql from 'graphql-tag'

export default gql`
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
