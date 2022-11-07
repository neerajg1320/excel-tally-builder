import {useEffect, useState} from "react";
import FilePickerComponent from "./components/FilePickerWithList/FilePicker/filePickerComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploadSimple from "./components/FilePickerWithList/FileUploadSimple/fileUpload";
import './App.css';
import FilesView from "./components/FilePickerWithList/FilesList/filesView";
import {useSelector, useDispatch} from "react-redux";

import Button from 'react-bootstrap/Button';
import ConditionalTooltipButton from "./components/TooltipButton/ConditionalTooltipButton";

import TallyServerStatus from "./components/TallyServer/TallyServerStatus";
import ExcelTallyHandler from "./components/ExcelTallyHandler/excelTallyHandler";
import FilePickerWithList from "./components/FilePickerWithList/filePickerWithList";


const { ipcRenderer } = window.require('electron');

function App() {
  const [files, setFiles] = useState([]);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("Message to be set");



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

      <ExcelTallyHandler />

      <FilePickerWithList files={files} onFilesChange={setFiles}/>

      <div className="submit-box">
        <ConditionalTooltipButton condition={!submitEnabled} message={tooltipMessage}>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </ConditionalTooltipButton>
      </div>
    </div>
  );
}

export default App;
