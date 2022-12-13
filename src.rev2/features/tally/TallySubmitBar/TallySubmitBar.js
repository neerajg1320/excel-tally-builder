import Button from "react-bootstrap/Button";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import {useCallback, useEffect} from "react";
import {DateToStringDate} from "../../../utils/date";
import {remoteCall} from "../../../utils/tallyRpc";
import {presetColumns} from "../../presetColumns";
import {addColumn, setRows} from "../../../redux/table/actions";
import {useDispatch, useSelector} from "react-redux";
import {exportJsonToExcel} from "../../../components/excel/xlsx/excel";
import {colToRTCol} from "../../../components/adapters/reactTableAdapter";

const TallySubmitBar = () => {
  const dispatch = useDispatch();
  const tallyStatus = useSelector((state) => state.tally.status);
  const tallyTargetCompany = useSelector((state) => state.tally.targetCompany);
  const columns = useSelector(state => state.columns);
  const rows = useSelector(state => state.rows);

  const handleAddCategoryClick = useCallback((columns) => {
    // console.log(`Need to add a new column`);
    const tableCategoryColumn = columns.filter(col => col.key === "Category");

    if (tableCategoryColumn.length < 1) {
      const categoryColumn = presetColumns.filter(col => col.key === 'Category');
      if (categoryColumn.length) {
        const categoryRTColumn = colToRTCol(categoryColumn[0]);
        dispatch(addColumn(categoryRTColumn));
      }
    } else {
      alert("Category is already present");
    }

  }, []);

  const handleSubmitClick = useCallback((data, columns) => {
    console.log(`data=${JSON.stringify(data, null, 2)}`);
    const tData = data.map(item => {return {
      ...item,
      Bank: "ICICIBank",
      ["Transaction Date"]: DateToStringDate(item["Transaction Date"]),
      ["Value Date"]: DateToStringDate(item["Value Date"])
    }});

    remoteCall('tally:command:vouchers:add', {tallyTargetCompany, rows: tData})
        .then((response) => {
          console.log(`handleResponse: response=${JSON.stringify(response, null, 2)}`);

          const resultMap = Object.fromEntries(response.map(res => [res.id, res.voucher_id]));
          console.log(`resultMap=${JSON.stringify(resultMap)}`);

          // Add column for showing voucherId
          const tableVoucherCol = columns.filter(col => col.key === 'VoucherId');
          if (tableVoucherCol.length < 1) {
            const voucherIdCol = presetColumns.filter(col => col.key === 'VoucherId');
            if (voucherIdCol.length > 0) {
              dispatch(addColumn(voucherIdCol[0]));
            }
          }

          // Add voucherId
          const newData = data.map(row => {
            console.log(`row=${JSON.stringify(row, null, 2)}`);
            return {
              ...row,
              'VoucherId': resultMap[row.id]
            }
          });
          console.log(`Saved to Tally: newData=${JSON.stringify(newData, null, 2)}`)
          dispatch(setRows(newData));

        })
        .catch(error => {
          console.error(`handleSubmit: error=${error}`);
        });
  }, []);

  const handleSaveClick = useCallback((e) => {
    const header = columns.map(col => col.label).filter(col => !!col);

    const data = rows.map(row => {
      const rowCopy = {...row};
      delete rowCopy.id;
      return rowCopy;
    });
    exportJsonToExcel(data, "file.xlsx", header);
  }, [rows, columns]);

  return (
      <div
          style={{
            height: "100%",
            backgroundColor: "white",
            boxShadow: "0 0 3px rgba(0,0,0,0.2)",
            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
          }}
      >
        <div
            style={{
              width: "90%",
              // border: "1px dashed blue",
              display: "flex", justifyContent:"flex-end", alignItems:"center", gap:"60px"
            }}
        >
          <div
              style={{
                display: "flex", flexDirection: "row", gap:"20px"
              }}
          >
            <Button
                className="btn-outline-primary bg-transparent"
                size="sm"
                onClick={handleSaveClick}
            >
              Save Table
            </Button>

            <Button
                className="btn-outline-primary bg-transparent"
                size="sm"
                onClick={e => handleAddCategoryClick(columns)}
            >
              Add Category
            </Button>
          </div>

          <ConditionalTooltipButton
              condition={!tallyStatus} message="No connection to Tally"
          >
            <Button onClick={e => handleSubmitClick(rows, columns)}>Submit To Tally</Button>
          </ConditionalTooltipButton>
        </div>

      </div>
  )
}

export default TallySubmitBar;