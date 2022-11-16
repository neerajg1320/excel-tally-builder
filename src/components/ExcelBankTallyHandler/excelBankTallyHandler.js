import ExcelViewerSheetjs from "../ExcelViewerSheetjs/excelViewer";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import Button from "react-bootstrap/Button";
import './style.css';
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {remoteCall} from "../../utils/rpc";
import {setLedgers} from "../../redux/tallyServer/tallyActions";


function ExcelBankTallyHandler() {
  const [data, setData] = useState([]);
  const tallyStatus = useSelector(state => state.tally.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tallyStatus) {
      remoteCall('tally:command:ledgers:list', {})
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
    console.log(`handleResponse: response=${JSON.stringify(response, null, 2)}`);

    const resultMap = Object.fromEntries(response.map(res => [res.id, res.voucher_id]));
    console.log(`resultMap=${JSON.stringify(resultMap)}`);
    const newData = data.map(row => {
      return {
        ...row,
        'VoucherID': resultMap[row.Serial]
      }
    });

    setData(newData);
  };

  const handleSubmit = (e) => {
    if (tallyStatus) {
      if (data.length) {
        // Add id to the rows
        const requestData = data.map(row => {
          // console.log('handleSubmit:', row)
          return {...row, id:row.Serial};
        });

        remoteCall('tally:command:vouchers:add', requestData)
            .then(handleResponse)
            .catch(error => {
              console.error(`handleSubmit: error=${error}`);
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