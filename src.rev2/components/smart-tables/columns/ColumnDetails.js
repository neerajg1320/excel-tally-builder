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
    ]
  },
  {
    name: "defaultChoice",
    type: "string"
  },
  {
    name: "index",
    type: "number"
  }
];

export const ColumnDetails = ({value: column, onChange}) => {

  const InputComponent = ({pName, pVal}) => {
    console.log(`Rendering <InputComponent>: pName=${pName}`);

    let pObjs = colSchema.filter(cSch => cSch.name === pName)
    if (pObjs.length > 0) {
      console.log(JSON.stringify(pObjs[0]))

      if (pObjs[0].type === 'string') {
        return (
            <span><input type="text" defaultValue={String(pVal)}/></span>
        );
      } else if (pObjs[0].type === 'boolean') {
        return (
            <span><input type="checkbox" defaultValue={pVal}/></span>
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
        <pre>
          {/*{JSON.stringify(Object.keys(column).map(k => ({k, val:column[k]})), null, 2)}*/}
          {/*{JSON.stringify(Object.keys(column), null, 2)}*/}
        </pre>
        {
          Object.keys(column).map((k, index) => {

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
                  <InputComponent pName={k} pVal={column[k]} />
                </span>
                </div>
            );
          })
        }

        {false && column && Object.entries(column).map(([colKey, colVal], index) => {
          return (
              <div key={index} style={{
                    border: "1px dashed transparent",
                    display: "flex", flexDirection:"row", justifyContent: "center"
                  }}
              >
                <span style={{border: "1px dashed transparent",width:"30%"}} row={index}>
                  {colKey}
                </span>
                <span style={{border: "1px dashed transparent",width:"30%"}} row={index}>
                  <InputComponent pName={colKey} pVal={colVal} />
                </span>
              </div>
          );
        })}
      </div>
  );
}
