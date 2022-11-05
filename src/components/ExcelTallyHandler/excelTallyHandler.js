import ExcelViewerSheetjs from "../ExcelViewerSheetjs/excelViewer";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";
import './style.css';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
const { ipcRenderer } = window.require('electron');

function ExcelTallyHandler() {
  const [data, setData] = useState([]);
  const tallyStatus = useSelector(state => state.tally.status);

  useEffect(() => {
    if (tallyStatus) {
      //TBD: This should be put in the Tally specific code
      ipcRenderer.send('command:tally:request', 'LEDGERS');
    }
  }, [tallyStatus]);

  const onDataChange = (newData) => {
    console.log('ExcelTallyHandler:onDataChange: newData=', newData);
    setData(newData);
  };

  const handleSubmit = (e) => {
    if (tallyStatus) {
      //TBD: This should be put in the Tally specific code
      if (data.length) {
        ipcRenderer.send('command:request', {
          command: 'ADD_BANK_TRANSACTIONS',
          data
        });
      }
    }
  };

  return (
    <div className="excel-handler-wrapper">
      <ExcelViewerSheetjs onDataChange={onDataChange}/>
      <ConditionalTooltipButton condition={true} message="Submit To Tally">
        <Button variant="primary" onClick={handleSubmit}>Submit To Tally</Button>
      </ConditionalTooltipButton>
    </div>
  );
}

export default ExcelTallyHandler;