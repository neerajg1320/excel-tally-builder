import './App.css';
import {BasicTable} from "./components/tables/basic-table/BasicTable";
import {SortingTable} from "./components/tables/sort-table/SortingTable";
import {FilteringTable} from "./components/tables/filter-table/FilteringTable";
import {PaginationTable} from "./components/tables/paginated-table/PaginationTable";
import {RowSelectionTable} from "./components/tables/selection-table/row-selection/RowSelectionTable";
import {RowModifyTable} from "./components/tables/selection-table/row-modify/RowModifyTable";
import {RowModifyFilterTable} from "./components/tables/selection-table/row-modify-filter/RowModifyFilterTable";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {RowModifyFilterIconTable} from "./components/tables/selection-table/row-modify-filtericon/RowModifyFilterIconTable";
import ReadExcel from "./components/excel/xlsx/ReadExcel";
import {useState} from "react";
import {SmartTable} from "./components/smart-tables/column-modify/SmartTable";
import TallyServerStatus from "./components/tally/TallyServerStatus/TallyServerStatus";

function App() {
  const [tabKey, setTabKey] = useState("readExcel");
  const boxShadow = "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px";
  // const boxShadow = "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";

  return (
      <div
          style={{
            display:"flex", flexDirection: "column", alignItems: "center", gap: "10px"
          }}
        >
        <div style={{
            marginTop: "20px",
            height: "15vh",
            width: "90%",
            boxShadow
          }}
        >
          <TallyServerStatus />
        </div>

        <div style={{
          height: "75vh",
            width: "90%",
            borderRadius: "4px",
            padding: "30px",
            margin: "20px",
            overflow: "scroll",
            boxShadow
          }}
        >
          <Tabs className="mb-3"
                activeKey={tabKey}
                onSelect={k => setTabKey(k)}
          >
            <Tab eventKey="readExcel" title="Read Excel">
              <ReadExcel onComplete={e => {setTabKey("addCategory")}}/>
            </Tab>
            {/*<Tab eventKey="basic" title="Basic">*/}
            {/*  <BasicTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="sorting" title="Sorting">*/}
            {/*  <SortingTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="filtering" title="Filtering">*/}
            {/*  <FilteringTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="pagination" title="Pagination">*/}
            {/*  <PaginationTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="rowSelection" title="Row Selection">*/}
            {/*  <RowSelectionTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="rowModify" title="Row Modify">*/}
            {/*  <RowModifyTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="rowModifyFilter" title="Row Modify Filter">*/}
            {/*  <RowModifyFilterTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="rowModifyFilterIcon" title="Row Modify Filter">*/}
            {/*  <RowModifyFilterIconTable />*/}
            {/*</Tab>*/}
            <Tab eventKey="addCategory" title="Add Category">
              <SmartTable />
            </Tab>
          </Tabs>
        </div>
      </div>
  )
}

export default App;
