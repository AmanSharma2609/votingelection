'use strict';
import React from 'react';
import Paper from 'material-ui/Paper';
import DocumentMeta from 'react-document-meta';

class MyOgComponent extends React.Component {
  render() {
    const imageUri = encodeURI('https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiSheTvgvLgAhVM6Y8KHXPZB5sQjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fwww.facebook.com%252Ffacebookdublin%252F%26psig%3DAOvVaw0EDCuB5Vayun4SIJjZwWW7%26ust%3D1552116547188710&psig=AOvVaw0EDCuB5Vayun4SIJjZwWW7&ust=1552116547188710');
    const meta = {
      title: 'Samvikshana - New Perspective of Exploration',
      meta: {
        property: {
          'og:title': 'Apna neta',
          'og:url': 'https://samvikshana.weebly.com/',
          'og:image': imageUri,
          'og:description': 'New Perspective of Exploration',
        }
    }
};

return (
  <div className='container-fluid'>
    <DocumentMeta {...meta} />
    <div>
      <div className='col-lg-6 col-lg-offset-3' style={{ padding: 30 }}>
        <Paper zDepth={2}>
          <div className='container-fluid'>
            Your Content Goes Here...
          </div>
        </Paper>
      </div>
    </div>
  </div>
);
}
}

export default MyOgComponent;
