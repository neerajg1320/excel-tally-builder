import Select from "react-select";
import {useEffect, useState} from "react";

const colSchema = [
  {
    name: "id",
    type: "string"
  },
  {
    name: "label",
    type: "string"
  },
  {
    name: "key",
    type: "string"
  },
  {
    name: "Header",
    type: "string"
  },
  {
    name: "Footer",
    type: "string"
  },
  {
    name: "edit",
    type: "boolean"
  },
  {
    name: "bulk",
    type: "boolean"
  },
  {
    name: "type",
    type: "select",
    choices: [
        "input", "select"
    ],
    defaultChoice: "input"
  },
  {
    name: "choices",
    type: "list", // How to specify list content types. Probably we should use schema
  },
  {
    name: "defaultChoice",
    type: "select"
  },
  {
    name: "index",
    type: "number"
  },

  // react-table columns
  {
    name: "disableFilters",
    type: "boolean"
  }
];

export const ColumnDetails = ({colItem: column, colChoices, onChange}) => {
  const InputComponent = ({pName, pVal, pChoices}) => {
    if (pVal === 'select') {
      console.log(`Rendering <InputComponent>: pName=${pName} pVal=${pVal} pChoices=${pChoices}`);
    }


    let pObjs = colSchema.filter(cSch => cSch.name === pName)
    if (pObjs.length > 0) {
      const propObj = pObjs[0]
      // console.log(JSON.stringify(propObj))

      if (propObj.type === 'string') {
        return (
            <span><input className="form-control" type="text" defaultValue={String(pVal)}/></span>
        );
      } else if (propObj.type === 'boolean') {
        return (
            <span><input className="form-check" type="checkbox" defaultChecked={pVal}/></span>
        );
      } else if (propObj.type === 'select') {
        console.log(`pName=${pName} pChoices=`, pChoices);
        let options;
        if(propObj.choices) {
          options = propObj.choices.map(choice => {return {label:choice, value:choice}})
        } else if (pChoices) {
          options = pChoices.map(choice => {return {label:choice, value:choice}})
        }

        console.log(`options=`, options);
        return (
            <Select options={options} defaultValue={{...options[0]}}/>
        );
      } else if (propObj.type === 'list') {

        console.log(`pVal=`, pVal);
        return (
            <ul>
              {pVal.map(val => (
                  <li style={{listStyle:"none"}}>
                    {val}
                  </li>
              ))}
            </ul>
        );
      }
    }

    return (
        <span>{String(pVal)}</span>
    );
  }

  return (
      <div style={{
          display: "flex", flexDirection:"column", justifyContent:"center", gap:"10px",
          padding: "20px"
        }}
      >
        {Object.keys(column).map((k, index) => {
            return (
                <div key={index} style={{
                  border: "1px dashed transparent",
                  display: "flex", flexDirection:"row", justifyContent: "center"
                }}
                >
                <span style={{border: "1px dashed transparent",width:"30%"}} row={index}>
                  {k}
                </span>
                <span style={{border: "1px dashed transparent",width:"30%"}} row={index}>
                  <InputComponent
                      pName={k}
                      pVal={column[k]}
                      pChoices={colChoices}
                  />
                </span>
                </div>
            );
          })
        }
      </div>
  );
}
