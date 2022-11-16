import './style.css';
import {useEffect, useState} from "react";
import FilePickerWithList from "../FilePickerWithList/filePickerWithList";
import TallySubmitButton from "../TallySubmitButton/tallySubmitButton";
import {remoteCall} from "../../utils/rpc";

function ExcelCommandTallyHandler() {
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    const filePaths = files.map(file => file.path);
    console.log(`Send the files`, filePaths);
    
    remoteCall('excel:file:processor', filePaths)
        .then(response => {
          console.log('handleSubmit: response=', response);
          setFiles([]);
        })
        .catch(error => {
          console.error(`handleSubmit: error=${error}`);
        })
  }

  return (
      <div className="app-box">
        <FilePickerWithList files={files} onFilesChange={setFiles}/>
        <TallySubmitButton files={files} onClick={handleSubmit}/>
      </div>
  );
}

export default ExcelCommandTallyHandler;
