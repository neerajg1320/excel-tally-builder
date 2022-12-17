import './table.css';
import {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {setColumns} from "../../../redux/table/actions";

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

export const ColumnsTable = () => {
  const [items, setItems] =useState(presetItems);
  const [applyEnabled, setApplyEnabled] = useState(false);
  const columns = useSelector(state => state.columns);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`Columns updated`);
    console.log(JSON.stringify(columns, null, 2));
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
  }

  return (
      <div style={{
            display:"flex", flexDirection:"column",
            justifyContent:"center", alignItems:"center",
          }}
      >
        <div className="columns-table">
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
                                    ref={provided.innerRef}
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
        <div style={{
              display:"flex", flexDirection:"row", gap:"20px",
              margin: "20px 0"
            }}
        >
          <Button className="btn-outline-danger bg-transparent">Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </div>
      </div>
  );
}
