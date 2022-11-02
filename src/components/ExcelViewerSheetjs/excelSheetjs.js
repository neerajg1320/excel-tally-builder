import * as XLSX from "xlsx";
import {useEffect, useState} from "react";
import {readExcel} from "../../excel/file";
import './style.css';
import DynamicTable from "../DynamicTable/dynamicTable";

function ExcelViewerSheetjs() {
  const [columns, setColumns] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const staticColumns = [
      {
        "title": "SNo",
        "hidden": false,
        "type": "integer",
        "key": "__rowNum__"
      },
      {
        "title": "Command",
        "hidden": false,
        "type": "text",
        "key": "Command"
      },
      {
        "title": "Status",
        "hidden": false,
        "type": "boolean",
        "key": "Status"
      },
      {
        "title": "First",
        "hidden": false,
        "type": "text",
        "key": "__EMPTY"
      },
      {
        "title": "Second",
        "hidden": false,
        "type": "text",
        "key": "__EMPTY_1"
      },
      {
        "title": "Third",
        "hidden": false,
        "type": "text",
        "key": "__EMPTY_2"
      }
    ];

    setColumns(staticColumns);
  }, [])


  const handleChange = (e) => {
    const file = e.target.files[0];
    readExcel(file)
      .then(resp => {
        console.log(resp);
        setItems(resp);
      });
  }

  return (
    <div className="excel-preview-wrapper">
      <input type="file" onChange={handleChange}/>
      <DynamicTable rows={items} columns={columns}/>
    </div>
  );
}

export default ExcelViewerSheetjs;