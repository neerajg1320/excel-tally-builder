import {useState} from "react";

const presetItems = [
  {
    id: 1,
    title: "Uno"
  },
  {
    id: 2,
    title: "Dos"
  },
  {
    id: 3,
    title: "Tres"
  }

]
export const ColumnsTable = () => {
  const [items, setItems] = useState(presetItems);

  return (
    <div style={{display:"flex"}}>
      <ul style={{minWidth:"200px"}}>
        {items.map((item) => (
          <li style={{
                listStyle:"none",
                border: "1px dashed lightgray",
                margin: "5px",
                textAlign: "center"
              }}
          >
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
