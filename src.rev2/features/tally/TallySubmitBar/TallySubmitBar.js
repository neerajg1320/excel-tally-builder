import Button from "react-bootstrap/Button";

const TallySubmitBar = () => {
  return (
      <div
          style={{
            height: "100%", padding: "10px", backgroundColor: "white",
            display: "flex", justifyContent:"flex-end",
            // border:"1px dashed blue",
            boxShadow: "0 0 3px rgba(0,0,0,0.2)"
          }}
      >
        <Button className="btn-primary" size="sm">Submit To Tally</Button>
      </div>
  )
}

export default TallySubmitBar;