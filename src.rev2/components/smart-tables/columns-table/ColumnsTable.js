import './table.css';
import {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const presetItems = [
  {
    id: "abc",
    title: "Uno"
  },
  {
    id: "def",
    title: "Dos"
  },
  {
    id: "ghi",
    title: "Tres"
  },
  {
    id: "jkl",
    title: "Quatro"
  },
  {
    id: "mno",
    title: "Cinco"
  }
]

export const ColumnsTable = () => {
  const [items, setItems] =useState(presetItems);

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  }

  return (
      <div className="columns-table">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
                <ul className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                  {items.map(({id,title}, index) => {
                    return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                              <li {...provided.draggableProps} {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                              >
                                {title}
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
  );
}
