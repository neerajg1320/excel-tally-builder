import {useEffect, useState} from "react";
import FilePickerComponent from "./components/FilePicker/filePickerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploadSimple from "./components/FileUploadSimple/fileUpload";
import './App.css';

const { ipcRenderer } = window.require('electron');

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log('useEffect: Creating Listeners');

    ipcRenderer.on('excel:processed', (event, files) => {
      console.log('mainWindow: files processed:', files);
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
    <div className="App">
      <div>
        <FilePickerComponent onChange={setFiles} />
      </div>
      <div>
        <FileUploadSimple onChange={setFiles}/>
      </div>
      <div className="submit-box">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
