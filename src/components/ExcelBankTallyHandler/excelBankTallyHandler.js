import ExcelViewerSheetjs from "../ExcelViewerSheetjs/excelViewer";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";
import './style.css';
import {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {remoteCall} from "../../utils/rpc";
import {setLedgers} from "../../redux/tallyServer/tallyActions";
const { ipcRenderer } = window.require('electron');

function ExcelBankTallyHandler() {
  const [data, setData] = useState([]);
  const tallyStatus = useSelector(state => state.tally.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tallyStatus) {
      remoteCall('tally:command', 'LEDGERS')
          .then(({request, response}) => {
            dispatch(setLedgers(response));
            console.log(`Updated ledgers request=${request}`);
          })
          .catch(error => {
            console.log(`useEffect[tallyStatus]: error=${error}`);
          });
    }
  }, [tallyStatus]);

  const onDataChange = (newData) => {
    console.log('ExcelBankTallyHandler:onDataChange: newData=', newData);
    setData(newData);
  };

  const handleResponse = (response) => {
    console.log(`command:vouchers:response response=${JSON.stringify(response, null, 2)}`);
    if (response.command == 'ADD_BANK_TRANSACTIONS') {
      const resultMap = Object.fromEntries(response.results.map(res => [res.id, res.voucher_id]));
      console.log(`resultMap=${JSON.stringify(resultMap)}`);
      const newData = data.map(row => {
        return {
          ...row,
          'VoucherID': resultMap[row.Serial]
        }
      });

      setData(newData);
    }
  };

  const handleSubmit = (e) => {
    if (tallyStatus) {
      //TBD: This should be put in the Tally specific code
      if (data.length) {
        ipcRenderer.once('command:vouchers:response', (event, response) => {
          handleResponse(response);
        });

        // Add id to the rows
        const requestData = data.map(row => {
          // console.log('handleSubmit:', row)
          return {...row, id:row.Serial};
        });

        ipcRenderer.send('command:vouchers:request', {
          command: 'ADD_BANK_TRANSACTIONS',
          data: requestData
        });

        // setData(requestData);
        onDataChange(requestData);
      }
    }
  };

  return (
    <div className="excel-handler-wrapper">
      <ExcelViewerSheetjs data={data} onDataChange={onDataChange}/>
      <ConditionalTooltipButton condition={true} message="Submit To Tally">
        <Button variant="primary" onClick={handleSubmit}>Submit To Tally</Button>
      </ConditionalTooltipButton>
    </div>
  );
}

export default ExcelBankTallyHandler;