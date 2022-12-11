import {RowModifyFilterIconTable} from "../../tables/selection-table/row-modify-filtericon/RowModifyFilterIconTable";
import {SmartFeatures} from "./SmartFeatures";

export const SmartTable = () => {
  // console.log(`Rendering <SmartTable>`);

  return (
    <div >
      <SmartFeatures />
      <RowModifyFilterIconTable />
    </div>
  );
}