import './style.css';
import Connection from "../ConnectionStatus/Connection";
import SingleSelect from "../SingleSelect/SingleSelect";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  setCompanies,
  setCurrentCompany,
  setLedgers,
  setStatus,
  setTargetCompany
} from "../../redux/tallyServer/tallyActions";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import {remoteCall, remoteMonitorStart, remoteMonitorStop} from "../../utils/rpc";
import {listToOptions} from "../../utils/options";

function TallyServerStatus() {
  const [commandOptions, setCommandOptions] = useState([]);
  const [selectedCommand, setSelectedCommand] = useState('');

  const [companyOptions, setCompanyOptions] = useState([]);
  // const [targetCompany, setTargetCompany] = useState('');
  const [serverUrl, setServerUrl] = useState('');

  const tallyStatus = useSelector((state) => state.tally.status);
  const tallyDebug = useSelector((state) => state.tally.debug);
  const tallyCompanies = useSelector((state) => state.tally.companies);
  const tallyCurrentCompany = useSelector((state) => state.tally.currentCompany);
  const tallyTargetCompany = useSelector((state) => state.tally.targetCompany);

  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const tallyServerUrl = useSelector((state) => state.tally.currentServerUrl);
  const channelServerHealth = 'tally:server:status:health';

  const tallyServerSetup = () => {
    if (config.debug) {
      remoteCall('command:list', {})
          .then(commands => {
            setCommandOptions(listToOptions(commands, 'Command'));
          });
    }

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


    remoteMonitorStart(channelServerHealth, (event, status) => {
      // console.log(`useEffect[] Monitor status=${status}`);
      dispatch(setStatus(status));
    });
  }

  const setServerClick = () => {
    if (serverUrl) {
      const serverInit = 'tally:server:init';
      remoteCall(serverInit, {serverUrl})
          .then(response => {
            console.log(`serverInit: response=${response}`);
            tallyServerSetup();
          })
          .catch(error => {
            console.error(`serverInit: error=${error}`);
          })
    }

    return () => {
      remoteMonitorStop(channelServerHealth, (event, response) => {
        console.log("Health Listener closed");
      });
    }
  };

  useEffect(() => {
    setServerUrl(tallyServerUrl);
  }, [tallyServerUrl])

  useEffect(() => {
    if (tallyStatus) {
      console.log('The Tally Server is ON');
      remoteCall('tally:command:companies:list', {})
          .then(({request, response}) => {
            console.log(`useEffect[tallyStatus] companies=${JSON.stringify(response, null, 2)}`);
            dispatch(setCompanies(response));
          });

    }
  }, [tallyStatus])

  useEffect(() => {
    if (tallyCompanies.length) {
      setCompanyOptions(listToOptions(tallyCompanies.map(company => company.name), "Company"));

      remoteCall('tally:command:companies:current', {})
          .then(({request, response}) => {
            console.log(`currentCompany: ${JSON.stringify(response.value, null, 2)}`);
            // setCurrentCompany(response);
            dispatch(setCurrentCompany(response.value));
          })
    }
  }, [tallyCompanies])

  useEffect(() => {
    dispatch(setTargetCompany(tallyCurrentCompany))
  }, [tallyCurrentCompany]);

  const handleTargetCompanyChange = (e) => {
    console.log(`e=${JSON.stringify(e, null, 2)}`)
    dispatch(setTargetCompany(e));
  }

  const handleUpdateClick = (e) => {
    console.log('selected command:', selectedCommand);
    if (tallyStatus) {
      remoteCall('tally:command', {command: selectedCommand, targetCompany: tallyTargetCompany})
          .then(({request, response}) => {
            console.log(`handleUpdateClick: request=${request} response=${JSON.stringify(response, null, 2)}`);
            if (request === "LEDGERS") {
              dispatch(setLedgers(response));
            } else if (request === "COMPANIES") {
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

      <div className="server-info-box">
        <div className="server-company-box">
          <span className="server-company-selectbox-title">Company</span>
          <SingleSelect options={companyOptions} onChange={handleTargetCompanyChange} value={tallyTargetCompany}/>
        </div>

        {
          config.debug &&
            (<div className="server-command-box">
              <SingleSelect options={commandOptions} onChange={setSelectedCommand}/>
              <div className="server-command-button">
                <ConditionalTooltipButton condition={!tallyStatus} message="No connection to Tally!">
                  <Button variant="outline-dark" onClick={handleUpdateClick}>Update</Button>
                </ConditionalTooltipButton>
              </div>
            </div>)
        }
        <div className="server-config-box">
          <input type="text" value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
          <button onClick={setServerClick}>Set Server</button>
        </div>
      </div>

    </div>

  );
}

export default TallyServerStatus;