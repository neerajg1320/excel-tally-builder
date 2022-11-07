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
import ExcelBankTallyHandler from "./components/ExcelBankTallyHandler/excelBankTallyHandler";
import FilePickerWithList from "./components/FilePickerWithList/filePickerWithList";


const { ipcRenderer } = window.require('electron');

function TallySubmitButton({files, onClick}) {
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("Message to be set");
  const tallyStatus = useSelector((state) => state.tally.status);

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

  return (
    <div className="submit-box">
      <ConditionalTooltipButton condition={!submitEnabled} message={tooltipMessage}>
        <Button variant="primary" onClick={onClick}>Submit</Button>
      </ConditionalTooltipButton>
    </div>
  );
}


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
      <div>
        <FilePickerWithList files={files} onFilesChange={setFiles}/>
        <TallySubmitButton files={files} onClick={handleSubmit}/>
      </div>
  );
}

function App() {


  return (
    <div className="App">
      <TallyServerStatus />

      <ExcelBankTallyHandler />

      <ExcelCommandTallyHandler />

    </div>
  );
}

export default App;
