import './style.css';
import Connection from "../ConnectionStatus/Connection";
import SingleSelect from "../SingleSelect/SingleSelect";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setStatus, setLedgers, setCompanies} from "../../redux/tallyServer/tallyActions";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";

const { ipcRenderer } = window.require('electron');

const remoteCall = (channel, command) => {
  return new Promise((resolve, reject) => {
    console.log(`remoteCall: command=${command}`);

    try {
      ipcRenderer.send(channel, command);
      ipcRenderer.once('command:response', (event, response) => {
        console.log(`remoteCall: command:response command=${command}`);
        resolve(response)
      });
    } catch (e) {
      reject(e);
    }
  })
}

function TallyServerStatus() {
  const [commandOptions, setCommandOptions] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState('');
  const tallyStatus = useSelector((state) => state.tally.status);
  const tallyDebug = useSelector((state) => state.tally.debug);
  const dispatch = useDispatch();

  useEffect(() => {

    ipcRenderer.once('tally:server:status:response', (event, status) => {
      if (tallyDebug) {
        console.log('mainWindow: tally:server:status:response=', status);
      }
      dispatch(setStatus(status));
    });

    // This is a health event which is sent by electron app without any request
    ipcRenderer.on('tally:server:status:health', (event, status) => {
      if (tallyDebug) {
        console.log('mainWindow: tally:server:status:health=', status);
      }
      dispatch(setStatus(status));
    });

    ipcRenderer.once('command:list:response', (event, commands) => {
      console.log(`commands: ${commands}`);
      if (commands.length) {
        const options = commands.map((cmd) => {return {label: cmd, value:cmd}});
        setCommandOptions(options);
      }
    });

    console.log('Sending server command');

    ipcRenderer.send('tally:server:status:request');
    ipcRenderer.send('command:list:request');

    return () => {
      console.log('Removing Listeners');
      ipcRenderer.removeListener('tally:server:status:response', () => {
        console.log('Remove tally:server:status:response')
      });
    }
  }, [])

  useEffect(() => {
    if (tallyStatus) {
      console.log('The Tally Server is ON');
      ipcRenderer.send('command:tally:ledgers:request', 'LEDGERS');
    } else {
      console.log('The Tally Server is OFF');
      ipcRenderer.removeListener('command:tally:ledgers:request', () => {
        console.log('Removed command:tally:request');
      });
    }

  }, [tallyStatus])

  const handleUpdateClick = (e) => {
    console.log('selected command:', selectedCommand);
    if (tallyStatus) {

      remoteCall('command:tally:request', selectedCommand)
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