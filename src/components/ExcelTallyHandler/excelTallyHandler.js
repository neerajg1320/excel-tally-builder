import ExcelViewerSheetjs from "../ExcelViewerSheetjs/excelViewer";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";
import './style.css';
import {useEffect} from "react";
import {useSelector} from "react-redux";
const { ipcRenderer } = window.require('electron');

function ExcelTallyHandler() {
  const tallyStatus = useSelector(state => state.tally.status);

  useEffect(() => {
    if (tallyStatus) {
      //TBD: This should be put in the Tally specific code
      ipcRenderer.send('command:request', 'LEDGERS');
    }
  }, [tallyStatus]);

  const handleSubmit = (e) => {
    if (tallyStatus) {
      //TBD: This should be put in the Tally specific code
      ipcRenderer.send('command:request', 'LEDGERS');
    }
  };

  return (
    <div className="excel-handler-wrapper">
      <ExcelViewerSheetjs />
      <ConditionalTooltipButton condition={true} message="Submit To Tally">
        <Button variant="primary" onClick={handleSubmit}>Submit To Tally</Button>
      </ConditionalTooltipButton>
    </div>
  );
}

export default ExcelTallyHandler;