import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {addColumn} from "../../../redux/actions";
import {exportJsonToExcel} from "../../excel/xlsx/excel";
import {presetColumns} from "../../../features/presetColumns";
import {colToRTCol} from "../../adapters/reactTableAdapter";

export const SmartFeatures = () => {
  // console.log(`Rendering <SmartFeatures>`);

  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns);
  const rows = useSelector(state => state.rows);

  const categoryPresent = useCallback(() => {
    const catCol = columns.filter(col => col.key?.toLowerCase() === "category");
    return catCol.length > 0
  }, [columns]);

  const handleAddCategoryClick = useCallback((e) => {
    // console.log(`Need to add a new column`);
    const categoryColumn = presetColumns.filter(col => col.key.toLowerCase() === 'category');
    if (categoryColumn.length) {
      const categoryRTColumn = colToRTCol(categoryColumn[0]);
      dispatch(addColumn(categoryRTColumn));
    }
  }, []);

  const handleSaveClick = useCallback((e) => {
    const header = columns.map(col => col.label).filter(col => !!col);

    const data = rows.map(row => {
      const rowCopy = {...row};
      delete rowCopy.id;
      return rowCopy;
    });
    exportJsonToExcel(data, "file.xlsx", header);
  }, [rows, columns]);

  return (
      <div
          style={{
            display:"flex", flexDirection:"row", justifyContent:"space-between",alignItems:"top",
            border:"1px solid lightblue", borderRadius: "5px"
          }}
      >
        <div style={{marginLeft:"10px", marginTop:"3px", fontSize:"0.8em"}}>
          Smart Features
        </div>
        <div
            style={{
              padding: "20px",
              display:"flex", flexDirection:"row", gap:"20px"
            }}
        >
          <Button
              className="btn-outline-primary bg-transparent"
              size="sm"
              onClick={handleSaveClick}
          >
            Save Table
          </Button>
          <Button
              disabled={categoryPresent()}
              className="btn-outline-primary bg-transparent"
              size="sm"
              onClick={handleAddCategoryClick}
          >
            Add Category
          </Button>
        </div>

      </div>
  );
}