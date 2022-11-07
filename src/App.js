import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TallyServerStatus from "./components/TallyServer/TallyServerStatus";
import ExcelBankTallyHandler from "./components/ExcelBankTallyHandler/excelBankTallyHandler";
import ExcelCommandTallyHandler from "./components/ExcelTallyCommandHandler/excelTallyCommandHandler";

function App() {

  return (
    <div className="App">
      <TallyServerStatus />

      <ExcelBankTallyHandler />

      <ExcelCommandTallyHandler />

    </div>
  );
}

export default App;
