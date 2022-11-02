import {useEffect, useState} from "react";
import FilePickerComponent from "./components/FilePicker/filePickerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploadSimple from "./components/FileUploadSimple/fileUpload";
import './App.css';
import FilesView from "./components/FilesList/filesView";
import Connection from "./components/ConnectionStatus/Connection";
import {useSelector, useDispatch} from "react-redux";
import {setStatus} from "./redux/tallyServer/tallyActions";

const { ipcRenderer } = window.require('electron');

function App() {
  const [files, setFiles] = useState([]);
  const flagShowSimpleBox = false;
  const status = useSelector((state) => state.tally.status);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect: Creating Listeners');

    ipcRenderer.on('excel:processed', (event, files) => {
      console.log('mainWindow: excel:processed=', files);
    });

    ipcRenderer.on('tally:server:status', (event, status) => {
      console.log('mainWindow: tally:server:status=', status);
      dispatch(setStatus(status));
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
      <Connection title={"Tally Server"} status={status}/>

      <div className="app-box">
        <div>
          <FilePickerComponent onChange={setFiles} />
        </div>
        {flagShowSimpleBox &&
          <div className="files-simple-box">
            <FileUploadSimple onChange={setFiles}/>
          </div>
        }
        <div className="files-view-box">
          <FilesView files={files} onChange={setFiles}/>
        </div>
        <div className="submit-box">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
