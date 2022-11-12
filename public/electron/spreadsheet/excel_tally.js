const { tallyCommands, tallyCommandMap } = require('../tally/commands');

const debugRow = false;
const debugParameters = false;

const processParameters = (params) => {
  if (debugParameters) {
    console.log(`params=${params}`);
  }

  const new_params = [];
  const debit_ledger = [];
  const credit_ledger = [];
  let i = 0;
  while (i < params.length) {
    const curr_param = params[i];
    if (curr_param !== 'DR' && curr_param != 'CR') {
      new_params.push(curr_param);
      i += 1;
    } else {
      const lentry = {}
      lentry['ledger_account'] = params[i+1];
      lentry['amount'] = params[i+2];
      if (curr_param === 'DR') {
        debit_ledger.push(lentry);
      } else if (curr_param === 'CR') {
        credit_ledger.push(lentry);
      } else {
        throw `ledger entry type ${curr_param} not handled`;
      }

      i += 3;
    }
  }

  new_params.push(debit_ledger);
  new_params.push(credit_ledger);

  if (debugParameters) {
    console.log(`new_params=${new_params}`);
  }

  return new_params;
}

const processRowTally = (row) => {
  if (debugRow) {
    console.log(`typeof(row)=${typeof row}`, row);
  }

  if (row.Command === undefined) {
    console.error("Key 'Command' not found in row");
    throw "error";
  }
  const row_command = row.Command;
  delete row.Command;

  let row_status = 'Active';
  if (row.Status !== undefined) {
    row_status = row.Status;
    delete row.Status;
  }
  const row_active =  row_status !== 'Disabled' && row_status !== 'Inactive';

  if (tallyCommands.includes(row_command)) {
    if (row_active) {
      let parameters = Object.keys(row).map(key => row[key]);
      if (debugParameters) {
        console.log(`parameters=${parameters}`)
      }

      parameters = processParameters(parameters);
      // Can be Temp Disabled
      tallyCommandMap[row_command].handler.apply(null, parameters)
          .then(response => {
            console.log(`processRowTally: response=${JSON.stringify(response)}`);
          })
          .catch(error => {
            console.log(`processRowTally: error=${JSON.stringify(error)}`);
          });
    } else {
      if (debugRow) {
        console.log(`row ${row} disabled`);
      }
    }
  } else {
    console.log(`Command ${row_command} is not valid`);
  }
}

module.exports = {
  processRowTally
}