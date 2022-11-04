import * as XLSX from "xlsx";
import {useEffect, useState} from "react";
import {readExcel} from "../../excel/read";
import './style.css';
import DynamicTable from "../DynamicTable/dynamicTable";
import DynamicReactTable from "../DynamicReactTable/dynamicReactTable";
import TallyTaggableTable from "../TallyTaggableTable/tallyTaggableTable";
import {tallyColumns, kotakbankColumns} from "./presetColumns";
import ConditionalTooltipButton from "../TooltipButton/ConditionalTooltipButton";
import {DateToStringDate} from "../../utils/date";

function ExcelViewerSheetjs({onDataChange}) {
  const [columns, setColumns] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // setColumns(tallyColumns);
    setColumns(kotakbankColumns);
  }, [])


  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    readExcel(file)
      .then(resp => {
        const data = resp.map(row => {
          return {
            ...row,
            'Transaction Date': DateToStringDate(new Date("2022-06-02"))
          }
        });
        console.log(data);
        setItems(data);
        if (onDataChange) {
          onDataChange(data);
        }
      });
  }

  return (
    <div className="excel-preview-wrapper">
      <input type="file" onChange={handleFileSelection}/>
      {/*<DynamicTable data={items} columns={columns}/>*/}
      {/*<DynamicReactTable data={items} columns={columns}/>*/}
      <TallyTaggableTable data={items} columns={columns} onDataChange={onDataChange}/>
    </div>
  );
}

export default ExcelViewerSheetjs;