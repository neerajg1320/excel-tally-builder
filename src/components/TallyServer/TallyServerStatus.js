import './style.css';
import Connection from "../ConnectionStatus/Connection";
import SingleSelect from "../SingleSelect/SingleSelect";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setCompanies, setLedgers, setStatus} from "../../redux/tallyServer/tallyActions";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import {remoteCall} from "../../utils/rpc";


function TallyServerStatus() {
  const [commandOptions, setCommandOptions] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState('');
  const tallyStatus = useSelector((state) => state.tally.status);
  const tallyDebug = useSelector((state) => state.tally.debug);
  const dispatch = useDispatch();

  useEffect(() => {
    remoteCall('command:list', {})
        .then(commands => {
          if (commands.length) {
            const options = commands.map((cmd) => {return {label: cmd, value:cmd}});
            setCommandOptions(options);
          }
        })

    const channelStatus = 'tally:server:status';
    remoteCall(channelStatus)
        .then(status => {
          if (tallyDebug) {
            console.log(`${channelStatus}=${status}`);
          }
          dispatch(setStatus(status));
        })
        .catch(error => {
          console.log(`TallyServerStatus:useEffect[] error=${error}`);
        });

    return () => {
      console.log('Removing Listeners if any');
    }
  }, [])

  useEffect(() => {
    if (tallyStatus) {
      console.log('The Tally Server is ON');
    }
  }, [tallyStatus])

  const handleUpdateClick = (e) => {
    console.log('selected command:', selectedCommand);
    if (tallyStatus) {

      remoteCall('tally:command', selectedCommand)
          .then(({request, response}) => {
            if (request == "LEDGERS") {
              dispatch(setLedgers(response));
            } else if (request == "COMPANIES") {
              dispatch(setCompanies(response));
            }
          })
          .catch(error => {
            console.log(`handleUpdateClick: error=${error}`);
          });
    }
  }

  return (
    <div className="server-container">
      <div className="server-status-box">
        <Connection title={"Tally Server"} status={tallyStatus}/>
      </div>

      <div className="server-command-box">
        <SingleSelect options={commandOptions} onChange={setSelectedCommand} />
        <div className="server-command-button">
          <ConditionalTooltipButton condition={!tallyStatus} message="No connection to Tally!">
            <Button variant="outline-dark" onClick={handleUpdateClick}>Update</Button>
          </ConditionalTooltipButton>
        </div>
      </div>

    </div>

  );
}

export default TallyServerStatus;