export const ColumnDetails = ({value: column, onChange}) => {
  return (
      <div style={{
          display: "flex", flexDirection:"column", justifyContent:"center", gap:"10px",
          padding: "20px"
        }}
      >
        {column && Object.entries(column).map(([key, val], index) => {
          return (
              <div key={index} style={{
                    border: "1px dashed transparent",
                    display: "flex", flexDirection:"row", justifyContent: "center"
                  }}
              >
                <span style={{border: "1px dashed transparent",width:"30%"}} row={index}>{key}</span>
                <span style={{border: "1px dashed transparent",width:"30%"}} row={index}>{val}</span>
              </div>
          );
        })}
      </div>
  );
}
