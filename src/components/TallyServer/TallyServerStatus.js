import './style.css';
import Connection from "../ConnectionStatus/Connection";
import SingleSelect from "../SingleSelect/SingleSelect";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setStatus} from "../../redux/tallyServer/tallyActions";

const { ipcRenderer } = window.require('electron');

function TallyServerStatus() {
  const [commandOptions, setCommandOptions] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState('');
  const tallyStatus = useSelector((state) => state.tally.status);
  const tallyDebug = useSelector((state) => state.tally.debug);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('tally:server:status', (event, status) => {
      console.log('mainWindow: tally:server:status=', status);
      dispatch(setStatus(status));
    });

    ipcRenderer.on('command:list:response', (event, commands) => {
      console.log(`commands: ${commands}`);
      if (commands.length) {
        const options = commands.map((cmd) => {return {label: cmd, value:cmd}});
        setCommandOptions(options);
      }
    })

    console.log('Sending server command');
    ipcRenderer.send('command:list:request');

    return () => {
      console.log('Removing Listeners');
      ipcRenderer.removeListener('tally:server:status', () => {
        console.log('tally:server:status')
      });
    }
  }, [])

  const handleCommandClick = (e) => {
    console.log('selected command:', selectedCommand);
    ipcRenderer.send('command:execute', selectedCommand);
  }



  return (
    <div className="server-container">
      <Connection title={"Tally Server"} status={tallyStatus}/>
      <div className="server-command-box">
        <SingleSelect options={commandOptions} onChange={setSelectedCommand} />
        <div className="server-command-button">
          <Button variant="outline-dark" onClick={handleCommandClick}>
            Command
          </Button>
        </div>

      </div>
    </div>

  );
}

export default TallyServerStatus;