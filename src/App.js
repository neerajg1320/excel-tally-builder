import './App.css';
import {useEffect, useState} from "react";

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
    console.log(`Send the files`, files);
    ipcRenderer.send('excel:submit', files);
  }

  const handleChange = (e) => {
    console.log(`Selected Files: `, e.target.files);

    const filesArray =[]
    for (let i=0; i<e.target.files.length; i++) {
      filesArray.push(e.target.files[i].path);
    }
    
    setFiles(filesArray);
  }

  return (
    <div className="App">
      <input type="file" onChange={handleChange} multiple/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
