import './connection.css';
import {AiFillSetting} from "react-icons/ai";
import {useState} from "react";
import Button from "react-bootstrap/Button";

function Connection({title, status}) {
  const [active, setActive] = useState(true);
  const handleSettingsClick = (e) => {
    setActive(!active);
  };

  const handleSaveClick = (e) => {
    setActive(!active);
  }

  return (
    <div className="connection-status-wrapper" style={{display:"flex", flexDirection:"column"}}>
      <div className="connection-status-box">
        <span>{title} connection is {status ? "On" : "Off"}</span>
        {status ?
          <span className="connection-indicator connection-active"></span> :
          <span className="connection-indicator connection-inactive"></span>
        }
      </div>
      <div style={{display: "flex", gap: "20px"}}>
        <div className="menu-container">
          <div className="settings-container">
            <div className="settings-input-trigger">
              <span>Settings</span>
              <AiFillSetting size={24} onClick={handleSettingsClick}/>
            </div>
            <div className={`settings-input-box ${active ? "active" : "inactive"}`}>
              <div className="input-field">
                <label>Server IP</label>
                <input type="text" />
              </div>
              <div className="input-field">
                <label>Server Port</label>
                <input type="text" />
              </div>
              <div className="settings-buttons-container">
                <Button className="bg-transparent  btn-outline-danger" onClick={handleSaveClick}>Cancel</Button>
                <Button className="btn-primary" onClick={handleSaveClick}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connection;
