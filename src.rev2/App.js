import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReadExcel from "./components/excel/xlsx/ReadExcel";
import {useState} from "react";
import {SmartTable} from "./components/smart-tables/transactions-table/SmartTable";
import {ColumnsTable} from "./components/smart-tables/columns-table/ColumnsTable";
import TallyServerStatus from "./features/tally/TallyServerStatus/TallyServerStatus";
import {MOCK_CHOICES} from "./assets/MOCK_CHOICES";
import TallySubmitBar from "./features/tally/TallySubmitBar/TallySubmitBar";
import "./bootstrap.custom.css";
import {useDispatch} from "react-redux";
import {setBanks} from "./redux/banks/actions";

function App() {
  const [tabKey, setTabKey] = useState("readExcel");
  const [categories, setCategories] = useState(MOCK_CHOICES);
  const boxShadow = "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px";
  const dispatch = useDispatch();

  const handleLedgersChange = (ledgers) => {
    // console.log(`ledgers=`, ledgers);
    setCategories(ledgers.map(lgr => lgr.name));
    const banks = ledgers
        .filter(lgr => lgr.parent === "Bank Accounts")
        .map(lgr => {return {name: lgr.name}});
    console.log(banks);
    dispatch(setBanks(banks));
  }

  return (

      <div
          style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap: "10px", justifyContent:"space-between"
          }}
      >
        <div style={{
          height: "100px", width: "100%",
          position: "fixed", top: 0,
          display: "flex", flexDirection: "row", justifyContent:"center",
          boxShadow: "0 0 3px 0 rgba(0,0,0,0.2)",
        }}
        >
          <TallyServerStatus onLedgersChange={handleLedgersChange}/>
        </div>

        <div style={{
          marginTop: "150px",
          marginBottom: "100px",
          width: "90%",
          borderRadius: "4px",
          minHeight: "60vh",
          boxShadow
        }}
        >
          <Tabs className="mb-3"
                activeKey={tabKey}
                onSelect={k => setTabKey(k)}
          >
            <Tab eventKey="readExcel" title="Read Excel">
              <ReadExcel onComplete={e => {setTabKey("transactionsTable")}}/>
            </Tab>
            <Tab eventKey="transactionsTable" title="Transactions">
              <SmartTable categories={categories}/>
            </Tab>
            <Tab eventKey="columnsTable" title="Columns">
              <ColumnsTable categories={categories}/>
            </Tab>
          </Tabs>
        </div>

        <div style={{
          height: "70px", width:"100%",
          position: "fixed", bottom: "0",
        }}
        >
          <TallySubmitBar />
        </div>
      </div>
  )
}

export default App;
