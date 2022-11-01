import {useEffect, useState} from "react";
import FilePickerComponent from "./components/FilePicker/filePickerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';


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

  const handleSelectionChange = (e) => {
    console.log(`Selected Files: `, e.target.files);

    const filesArray =[]
    for (let i=0; i<e.target.files.length; i++) {
      filesArray.push(e.target.files[i]);
    }

    setFiles(filesArray);
  }

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleSelectionChange} multiple/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <FilePickerComponent onChange={setFiles} />
      </div>

    </div>
  );
}

export default App;
