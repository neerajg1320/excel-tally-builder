import {RowModifyFilterIconTable} from "../../tables/selection-table/row-modify-filtericon/RowModifyFilterIconTable";
import {SmartFeatures} from "./SmartFeatures";
import TallyServerStatus from "../../tally/TallyServerStatus/TallyServerStatus";

export const SmartTable = () => {
  // console.log(`Rendering <SmartTable>`);

  return (
    <div >
      <TallyServerStatus />
      <SmartFeatures />
      <RowModifyFilterIconTable />
    </div>
  );
}