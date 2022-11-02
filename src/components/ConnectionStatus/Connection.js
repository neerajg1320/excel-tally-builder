import './connection.css';

function Connection({title, status}) {
  return (
    <div className="connection-status-wrapper">
      <div className="connection-status-box">
        <span>{title}</span>
        <span>  is  </span>
        <span>{status ? "On" : "Off"}</span>
      </div>
    </div>
  );
}

export default Connection;
