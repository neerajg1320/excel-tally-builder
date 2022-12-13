import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {addColumn} from "../../../redux/table/actions";
import {exportJsonToExcel} from "../../excel/xlsx/excel";
import {presetColumns} from "../../../features/presetColumns";
import {colToRTCol} from "../../adapters/reactTableAdapter";

export const SmartFeatures = () => {
  // console.log(`Rendering <SmartFeatures>`);

  const dispatch = useDispatch();
  const columns = useSelector(state => state.columns);
  const rows = useSelector(state => state.rows);

  const handleAddCategoryClick = useCallback((columns) => {
    // console.log(`Need to add a new column`);
    const tableCategoryColumn = columns.filter(col => col.key === "Category");

    if (tableCategoryColumn.length < 1) {
      const categoryColumn = presetColumns.filter(col => col.key === 'Category');
      if (categoryColumn.length) {
        const categoryRTColumn = colToRTCol(categoryColumn[0]);
        dispatch(addColumn(categoryRTColumn));
      }
    } else {
      alert("Category is already present");
    }

  }, []);



  return (
      <div
          style={{
            display:"flex", flexDirection:"row", justifyContent:"space-between",alignItems:"top",
            border:"1px solid lightblue", borderRadius: "5px",
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
              onClick={e => handleAddCategoryClick(columns)}
          >
            Add Category
          </Button>
        </div>

      </div>
  );
}