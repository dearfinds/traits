import React, { Component } from 'react';
import * as _ from 'lodash';
import ImageUploadBlob from './imageUploadBlob';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getImage = this.getImage.bind(this);
  }

  getImage(idx) {
    if (_.size(this.props.images) >= idx)
      return this.props.images[idx];
    return "";
  }

  render() {
    const { onImageRead } = this.props
    return (
      <div className="image-uploader-wrapper">
        <div className="section-title">Put a face for the profile</div>
        <div className="image-uploader-content">
          {_.map([0,1,2,3], idx =>
            <ImageUploadBlob key={idx} onImageRead={onImageRead} image={this.getImage(idx)} />
          )}
        </div>
      </div>
    );
  }
}

export default ImageUploader;
