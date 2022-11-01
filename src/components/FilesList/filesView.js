import { ImageConfig } from './ImageConfig';
import './style.css';

function FilesView({files, onChange}) {
  const handleFileRemove = (file) => {
    console.log(`${file}`);
    const updatedFiles = [...files];
    updatedFiles.splice(files.indexOf(file), 1);

    onChange(updatedFiles);
  }

  return (files &&
    files.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">
            Ready to upload
          </p>
          {files &&
            files.map((item, index) => (
              <div key={index} className="drop-file-preview__item">
                <img
                  className="drop-file-preview__image"
                  src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt=""
                />
                <div className="drop-file-preview__item__info">
                  <p>{item.name}</p>
                  <p>{item.size}B</p>
                </div>
                <span className="drop-file-preview__item__del"
                      onClick={() => handleFileRemove(item)}>
                  x
                </span>
              </div>
            ))
          }
        </div>
    ) : null
  )
}

export default FilesView;