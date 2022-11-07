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
import ExcelCommandTallyHandler from "./components/ExcelTallyCommandHandler/excelTallyCommandHandler";



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
