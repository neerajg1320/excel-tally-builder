import * as XLSX from "xlsx";
import React, {useEffect, useState} from "react";
import {readExcel} from "../../excel/read";
import './style.css';
import DynamicTable from "../DynamicTable/dynamicTable";
import DynamicReactTable from "../DynamicReactTable/dynamicReactTable";
import TallyTaggableTable from "../TallyTaggableTable/tallyTaggableTable";
import {tallyColumns, kotakbankColumns} from "./presetColumns";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import {DateToStringDate, DateFromString, isDate} from "../../utils/date";
import {NumberFromString} from "../../utils/number";

function ExcelViewerSheetjs({data, onDataChange}) {
  const [columns, setColumns] = useState([]);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    setColumns(kotakbankColumns);
  }, [])



  const handleFileSelection = (e) => {
    const debugFn = false;
    const file = e.target.files[0];
    readExcel(file)
      .then(resp => {
        const rows = resp.map((row) => {
          if (debugFn) {
            console.log(`handleFileSelection: '${row['Transaction Date']}' '${row['Value Date']}'`);
          }

          let transactionDate = row['Transaction Date'];
          if (!isDate(transactionDate)) {
            transactionDate = DateFromString(transactionDate, "dd/MM/yyyy hh:mm aa");
            if (debugFn) {
              console.log('transactionDate converted to type Date', transactionDate.toString());
            }
          }

          let valueDate = row['Value Date'];
          if (!isDate(valueDate)) {
            valueDate = DateFromString(valueDate, "dd/MM/yyyy");
            if (debugFn) {
              console.log('valueDate converted to type Date', valueDate.toString());
            }
          }

          try {
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
            //The following catch needs to be removed
          } catch (error) {
            console.log(error);
            // console.log(`handleFileSelection: row=${JSON.stringify(row, null, 2)}`)

            const parsedRow = {
              ...row,
              'Transaction Date': transactionDate.toString(),
              'Value Date': valueDate.toString(),
            }
            return parsedRow;
          }
        });

        console.log(`Read from file, rows=`, rows);
        setFileData(rows);

        if (onDataChange) {
          onDataChange(rows);
        }
      });
  }

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => {
    if (onDataChange) {
      onDataChange(fileData);
    }
  }


  return (
    <div className="excel-preview-wrapper">
      <div>
        <input type="file" onChange={handleFileSelection}/>
        <button onClick={resetData}>Reset Data</button>
      </div>
      <TallyTaggableTable columns={columns} data={data} onDataChange={onDataChange}/>
    </div>
  );
}

export default ExcelViewerSheetjs;