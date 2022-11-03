import ExcelViewerSheetjs from "../ExcelViewerSheetjs/excelViewer";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";
import './style.css';
import {useEffect} from "react";

function ExcelTallyHandler() {
  useEffect(() => {

  });

  const handleSubmit = (e) => {

  };

  return (
    <div className="excel-handler-wrapper">
      <ExcelViewerSheetjs />
      <ConditionalTooltipButton condition={true} message="Submit To Tally">
        <Button variant="primary" onClick={handleSubmit}>Add To Tally</Button>
      </ConditionalTooltipButton>
    </div>
  );
}

export default ExcelTallyHandler;