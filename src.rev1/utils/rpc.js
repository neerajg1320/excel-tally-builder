const { ipcRenderer } = window.require('electron');

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