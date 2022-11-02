import {useEffect, useState} from "react";
import FilePickerComponent from "./components/FilePicker/filePickerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploadSimple from "./components/FileUploadSimple/fileUpload";
import './App.css';
import FilesView from "./components/FilesList/filesView";
import Connection from "./components/ConnectionStatus/Connection";
import {useSelector, useDispatch} from "react-redux";
import {setStatus} from "./redux/tallyServer/tallyActions";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ConditionalTooltipButton from "./components/TooltipButton/ConditionalTooltipButton";

const { ipcRenderer } = window.require('electron');

function App() {
  const [files, setFiles] = useState([]);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("Message to be set");

  const flagShowSimpleBox = false;
  const tallyStatus = useSelector((state) => state.tally.status);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect: Creating Listeners');

    ipcRenderer.on('excel:processed', (event, files) => {
      console.log('mainWindow: excel:processed=', files);
      setFiles([]);
    });

    ipcRenderer.on('tally:server:status', (event, status) => {
      console.log('mainWindow: tally:server:status=', status);
      dispatch(setStatus(status));
    });

    ipcRenderer.on('command:list:response', (event, commands) => {
      console.log(`commands: ${commands}`);
    })

    return () => {
      console.log('Removing Listeners');
      ipcRenderer.removeAllListeners();
    }
  },[]);

  useEffect(() => {
    if (!tallyStatus) {
      setSubmitEnabled(false);
      setTooltipMessage("No connection to Tally!");
    } else if (!files.length) {
      setSubmitEnabled(false);
      setTooltipMessage("Please select file(s)");
    } else {
      setSubmitEnabled(true);
      setTooltipMessage("");
    }
  }, [files, tallyStatus]);

  const handleSubmit = (e) => {
    if (tallyStatus) {
      const filePaths = files.map(file => file.path);
      console.log(`Send the files`, filePaths);
      ipcRenderer.send('excel:submit', filePaths);
    } else {
      console.log(`Tally is not connected. Submit click ignored`)
    }
  }

  const handleServerCommand = (e) => {
    console.log('Sending server command');
    ipcRenderer.send('command:list:request');
  }

  return (
    <div className="App">

      <div className="server-container">
        <Connection title={"Tally Server"} status={tallyStatus}/>
        <div className="server-command-button">
          <Button variant="outline-dark" onClick={handleServerCommand}>
            Command
          </Button>
        </div>
      </div>

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
          <ConditionalTooltipButton condition={!submitEnabled} message={tooltipMessage}>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          </ConditionalTooltipButton>
        </div>
      </div>
    </div>
  );
}

export default App;
