import './connection.css';

function Connection({title, status}) {
  return (
    <div className="connection-status-wrapper">
      <div className="connection-status-box">
        <span>{title} is {status ? "On" : "Off"}</span>
        {status ?
          <span className="connection-indicator connection-active"></span> :
          <span className="connection-indicator connection-inactive"></span>
        }
      </div>
    </div>
  );
}

export default Connection;
