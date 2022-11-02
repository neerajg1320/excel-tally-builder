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
import SingleSelect from "./components/SingleSelect/SingleSelect";
import TallyServerStatus from "./components/TallyServer/TallyServerStatus";

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


  return (
    <div className="App">
      <TallyServerStatus />

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
