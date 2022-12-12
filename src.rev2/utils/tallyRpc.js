
let ipcRenderer;

try {
  ipcRenderer = window.require('electron').ipcRenderer;
} catch (err) {

  const eventSender = (channel, arg) => {
    console.log(`stubEventSender: ${channel}: stub call`);
  };
  const addListener = (channel, arg) => {
    console.log(`addListener: ${channel}: stub call`);
  };
  const removeListener = (channel, arg) => {
    console.log(`removeListener: ${channel}: stub call`);
  };

  ipcRenderer = {
    on: addListener,
    once: addListener,
    send: eventSender,
    removeListener: removeListener,
    removeListeners: removeListener
  }
}

export const remoteCall = (channel, command) => {
  return new Promise((resolve, reject) => {
    // console.log(`remoteCall: command=${command}`);

    try {
      ipcRenderer.send(channel, command);
      ipcRenderer.once(channel, (event, response) => {
        // console.log(`remoteCall: command:response command=${command}`);
        resolve(response)
      });
    } catch (e) {
      reject(e);
    }
  })
}

export const remoteMonitorStart = (channel, callback) => {
  ipcRenderer.on(channel, callback);
}

export const remoteMonitorStop = (channel, callback) => {
  ipcRenderer.removeListener(channel, callback);
}

export const removeListeners = () => {
  console.log('Removing Listeners');
  ipcRenderer.removeAllListeners();
}