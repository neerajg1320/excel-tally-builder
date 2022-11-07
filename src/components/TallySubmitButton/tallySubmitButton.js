import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";

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

export default TallySubmitButton;
