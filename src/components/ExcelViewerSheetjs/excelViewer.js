import * as XLSX from "xlsx";
import {useEffect, useState} from "react";
import {readExcel} from "../../excel/read";
import './style.css';
import DynamicTable from "../DynamicTable/dynamicTable";
import DynamicReactTable from "../DynamicReactTable/dynamicReactTable";
import TallyTaggableTable from "../TallyTaggableTable/tallyTaggableTable";
import {tallyColumns, kotakbankColumns} from "./presetColumns";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import {DateToStringDate, DateFromString} from "../../utils/date";
import {NumberFromString} from "../../utils/number";

function ExcelViewerSheetjs({data, onDataChange}) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(kotakbankColumns);
  }, [])


  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    readExcel(file)
      .then(resp => {
        const items = resp.map(row => {

          const transactionDate = DateFromString(row['Transaction Date'], "dd/MM/yyyy hh:mm aa")
          // console.log(`transactionDate=${transactionDate}`);
          const valueDate = DateFromString(row['Value Date'], "dd/MM/yyyy");
          // console.log(`valueDate=${valueDate}`);

          const parsedRow = {
            ...row,
            'Transaction Date': DateToStringDate(transactionDate),
            'Value Date': DateToStringDate(valueDate),
            'Balance': NumberFromString(row['Balance'])
          }
          if (Object.keys(row).includes('Debit')) {
            parsedRow['Debit'] = NumberFromString(row['Debit'])
          }
          if (Object.keys(row).includes('Credit')) {
            parsedRow['Credit'] = NumberFromString(row['Credit'])
          }

          return parsedRow;
        });

        console.log(`Read from file, item=`, items);

        if (onDataChange) {
          onDataChange(items);
        }
      });
  }

  return (
    <div className="excel-preview-wrapper">
      <input type="file" onChange={handleFileSelection}/>
      <TallyTaggableTable data={data} columns={columns} onDataChange={onDataChange}/>
    </div>
  );
}

export default ExcelViewerSheetjs;