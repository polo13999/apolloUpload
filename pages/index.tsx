import * as React from 'react';
import WithData from '../provider/with-data'
import UploadFile from '../src/components/Uploads/'

export interface MainPageProps {
}
@WithData
export default class MainPage extends React.Component<MainPageProps, any> {
  render() {
    return (
      <div>        測試上傳

      <UploadFile>
        </UploadFile>      </div>
    );
  }
}

