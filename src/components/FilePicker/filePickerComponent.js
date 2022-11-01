import Dropzone from 'react-dropzone'
import './style.css';
import {useRef} from "react";

function FilePickerComponent({onChange}) {

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      console.log(file);
    })

    if (acceptedFiles.length) {
      onChange(acceptedFiles);
    }
  }

  return (
    <div className="wrapper text-center mt-5">
      <Dropzone
          onDrop={onDrop}
          multiple
      >
        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
            <div className="dropzone-box" {...getRootProps()}>
              <input {...getInputProps()} />
              <span className="dropzone-placeholder">
                {!isDragActive && 'Click here or drop a file to upload!'}
              </span>
              <span className="dropzone-drag-active">
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
              </span>
              <span className="dropzone-drag-reject">
                {isDragReject && "File type not accepted, sorry!"}
              </span>
            </div>
        )}
      </Dropzone>
    </div>
  );
}

export default FilePickerComponent;