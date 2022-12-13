import {RowModifyFilterIconTable} from "../../tables/selection-table/row-modify-filtericon/RowModifyFilterIconTable";
import {SmartFeatures} from "./SmartFeatures";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setChoices} from "../../../redux/table/actions";

export const SmartTable = ({ categories }) => {
  console.log(`Rendering <SmartTable> categories=`, categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChoices('category', categories));
  }, [categories])

  return (
    <div style={{border:"2px dashed black"}}>
      <SmartFeatures />
      <RowModifyFilterIconTable />
    </div>
  );
}