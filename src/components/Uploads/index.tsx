import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import uploadsQuery from '../gqlSchema/uploads'
import * as React from 'react';

export interface UploadFileProps {
  handleChange: any;
}

class UploadFile extends React.Component<UploadFileProps, any> {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <div>
        <input type="file" required={true} onChange={this.props.handleChange} />
      </div>
    );
  }
}
export default graphql<any, any>(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      fileId
      filename
      encoding
      mimetype
      path
    }
  }
`,
  {
    props: ({ mutate }) => ({
      handleChange: ({ target: { validity, files: [file] } }) => {
        validity.valid &&
          mutate({
            variables: { file },
            update: (proxy, { data: { singleUpload } }) => {
              const data: any = proxy.readQuery({ query: uploadsQuery })
              data.uploads.push(singleUpload)
              proxy.writeQuery({ query: uploadsQuery, data })
            }
          })
      }
    })
  }
)(UploadFile)

