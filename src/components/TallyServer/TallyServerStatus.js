import './style.css';
import Connection from "../ConnectionStatus/Connection";
import SingleSelect from "../SingleSelect/SingleSelect";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setStatus, setLedgers} from "../../redux/tallyServer/tallyActions";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";

const { ipcRenderer } = window.require('electron');

function TallyServerStatus() {
  const [commandOptions, setCommandOptions] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState('');
  const tallyStatus = useSelector((state) => state.tally.status);
  const tallyDebug = useSelector((state) => state.tally.debug);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('tally:server:status', (event, status) => {
      if (tallyDebug) {
        console.log('mainWindow: tally:server:status=', status);
      }
      dispatch(setStatus(status));
    });

    ipcRenderer.on('command:list:response', (event, commands) => {
      console.log(`commands: ${commands}`);
      if (commands.length) {
        const options = commands.map((cmd) => {return {label: cmd, value:cmd}});
        setCommandOptions(options);
      }
    });

    ipcRenderer.on('command:response', (event, {request, response}) => {
      if (request == "LEDGERS") {
        dispatch(setLedgers(response));
      }
    });

    console.log('Sending server command');
    ipcRenderer.send('command:list:request');

    return () => {
      console.log('Removing Listeners');
      ipcRenderer.removeListener('tally:server:status', () => {
        console.log('tally:server:status')
      });
    }
  }, [])

  const handleUpdateClick = (e) => {
    console.log('selected command:', selectedCommand);
    if (tallyStatus) {
      ipcRenderer.send('command:tally:request', selectedCommand);
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