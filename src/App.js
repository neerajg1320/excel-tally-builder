import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useSelector} from "react-redux";

import TallyServerStatus from "./components/TallyServer/TallyServerStatus";
import ExcelBankTallyHandler from "./components/ExcelBankTallyHandler/excelBankTallyHandler";
import ExcelCommandTallyHandler from "./components/ExcelTallyCommandHandler/excelTallyCommandHandler";

function App() {
  const config = useSelector((state) => state.config);

  return (
    <div className="App">
      <TallyServerStatus />

      <ExcelBankTallyHandler />

      {
        config.debug &&
          (<ExcelCommandTallyHandler />)
      }


    </div>
  );
}

export default App;
