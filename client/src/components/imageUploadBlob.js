import React, { Component } from 'react';
import PlusImage from '../images/plus.png';
import DropZone from 'react-dropzone';
import * as _ from 'lodash';

class ImageUploadBlob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({ file: _.first(acceptedFiles) });
    const { onImageRead } = this.props;
    _.each(acceptedFiles, file => {
        const reader = new FileReader();
        reader.onload = () => { onImageRead(reader.result) };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.readAsDataURL(file);
    });
  }

  render() {
    const { image } = this.props;
    const hasNoDBImage = _.isEmpty(_.get(image, 'data'))
    const imageMeta = hasNoDBImage ?
      { src: PlusImage, className: 'plus-image' } :
      { src: _.get(image, 'data'), className: 'image-upload--thumbnail'};
    const dropzoneComp = (
      <DropZone className="image-uploader-blob" accept="image/*" multiple={false} onDrop={this.onDrop.bind(this)} >
        {
          _.isEmpty(this.state.file) ?
          <img className={imageMeta.className} src={imageMeta.src} alt="" /> :
          <div className="image-upload--thumbnail-wrapper">
            <img className="image-upload--thumbnail" src={this.state.file.preview} alt="preview" />
          </div>
        }
      </DropZone>
    );
    return (hasNoDBImage ? dropzoneComp :
        <div className="image-uploader-blob">
          <img className={imageMeta.className} src={imageMeta.src} alt="" />
        </div>
      );
  }
}

export default ImageUploadBlob;
