
let ipcRenderer;

try {
  ipcRenderer = window.require('electron').ipcRenderer;
} catch (err) {

  const stubEventSender = (channel, arg) => {
    console.log(`${channel}: stub call`);
  };
  const stubListenerInvoker = (channel, arg) => {
    console.log(`${channel}: stub call`);
  };

  ipcRenderer = {
    on: stubListenerInvoker,
    once: stubListenerInvoker,
    send: stubEventSender
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