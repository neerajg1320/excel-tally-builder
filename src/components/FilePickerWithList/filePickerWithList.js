import FilePickerComponent from "./FilePicker/filePickerComponent";
import FileUploadSimple from "./FileUploadSimple/fileUpload";
import FilesView from "./FilesList/filesView";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";

function FilePickerWithList({files, onFilesChange}) {
  const flagShowSimpleBox = false;

  return(
      <div className="app-box">
        <div>
          <FilePickerComponent onChange={onFilesChange} />
        </div>

        {flagShowSimpleBox &&
            <div className="files-simple-box">
              <FileUploadSimple onChange={onFilesChange}/>
            </div>
        }

        <div className="files-view-box">
          <FilesView files={files} onChange={onFilesChange}/>
        </div>
      </div>
  );
}

export default FilePickerWithList;
