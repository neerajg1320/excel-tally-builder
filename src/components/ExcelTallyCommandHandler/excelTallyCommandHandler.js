import {useEffect, useState} from "react";
import FilePickerWithList from "../FilePickerWithList/filePickerWithList";
import TallySubmitButton from "../TallySubmitButton/tallySubmitButton";

const { ipcRenderer } = window.require('electron');

function ExcelCommandTallyHandler() {
  const [files, setFiles] = useState([]);


  useEffect(() => {
    console.log('useEffect: Creating Listeners');

    ipcRenderer.on('excel:processed', (event, files) => {
      console.log('mainWindow: excel:processed=', files);
      setFiles([]);
    });

    return () => {
      console.log('Removing Listeners');
      ipcRenderer.removeAllListeners();
    }
  },[]);


  const handleSubmit = (e) => {
    const filePaths = files.map(file => file.path);
    console.log(`Send the files`, filePaths);
    ipcRenderer.send('excel:submit', filePaths);
  }

  return (
      <div className="app-box">
        <FilePickerWithList files={files} onFilesChange={setFiles}/>
        <TallySubmitButton files={files} onClick={handleSubmit}/>
      </div>
  );
}

export default ExcelCommandTallyHandler;
