import './table.css';
import {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {setColumns} from "../../../redux/table/actions";
import {ColumnDetails} from "./ColumnDetails";

const presetItems = [
  {
    key: "abc",
    Header: "Uno"
  },
  {
    key: "def",
    Header: "Dos"
  },
  {
    key: "ghi",
    Header: "Tres"
  },
  {
    key: "jkl",
    Header: "Quatro"
  },
  {
    key: "mno",
    Header: "Cinco"
  }
]

export const ColumnsSettings = () => {
  const [items, setItems] =useState(presetItems);
  const [colValue, setColValue] = useState(items[0]);
  const [applyEnabled, setApplyEnabled] = useState(false);
  const columns = useSelector(state => state.columns);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(`Columns updated`);
    // console.log(JSON.stringify(columns, null, 2));
    setItems(columns);
  }, [columns]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result);

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    setApplyEnabled(true);
  }

  const handleSaveClick = (e) => {
    const orderedKeys = items.map(item => item.key);
    console.log(`New order: ${orderedKeys}`);
    const newColumns = [];
    orderedKeys.forEach((key, index) => {
      const col = columns.filter(col => col.key === key)[0]
      newColumns.push({label: col.key, key: col.key, index});
    })
    console.log(JSON.stringify(newColumns, null, 2));
    dispatch(setColumns(newColumns));
    setApplyEnabled(false);
  }

  const handleColumnChange = (id, col) => {

  }

  const handleItemClick = (e, index) => {
    console.log(`Item ${index} clicked`);
    setColValue(items[index]);
  }

  return (
      <>
        <div>
          <div style={{
                width: "100%",
                display:"flex", justifyContent:"center",
              }}
          >
            <div style={{
                  display:"flex", flexDirection:"column",
                  justifyContent:"center", alignItems:"center",
                }}
            >
              <div className="columns-index"
              >
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="characters"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                          {items.map(({key,Header}, index) => {
                            return (
                                <Draggable key={key} draggableId={key} index={index}>
                                  {(provided) => (
                                      <li {...provided.draggableProps} {...provided.dragHandleProps}
                                          ref={provided.innerRef} onClick={e => handleItemClick(e, index)}
                                      >
                                        {key}
                                      </li>
                                  )}
                                </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

            </div>
            <div style ={{
                  // border: "1px dashed blue",
                  width:"80%",
                  display: "flex", justifyContent:"center", alignItems:"center",
                }}
            >
              <div style={{
                    width:"90%", height:"100%",
                    border:"1px solid lightgray", borderRadius: "5px",
                  }}
              >
                <ColumnDetails value={colValue} onChange={handleColumnChange}/>
              </div>
            </div>
          </div>
          <div style={{
            // border: "1px dashed red",
            display:"flex", flexDirection:"row", justifyContent:"center", gap:"20px",
            margin: "20px 0"
          }}
          >
            <Button disabled={!applyEnabled}
                    className="btn-outline-danger bg-transparent"
            >
              Cancel
            </Button>
            <Button disabled={!applyEnabled}
                    className="btn-primary"
                    onClick={handleSaveClick}
            >
              Save
            </Button>
          </div>
        </div>
      </>
  );
}
