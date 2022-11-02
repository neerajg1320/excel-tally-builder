import Form from 'react-bootstrap/Form';

function SingleSelect({options, onChange}) {
  const handleChange = (e) => {
    // console.log('SingleSelect:handleChange', e.target.value);
    onChange(e.target.value);
  }

  return (
      <div className="select-wrapper">
        <Form.Select aria-label="Default select example" onChange={handleChange}>
          <option>Open this select menu</option>
          {
            options && (
                options.map((opt, index) => <option key={index} value={opt.value}>{opt.label}</option>)
              )
          }
        </Form.Select>
      </div>
  );
}

export default SingleSelect;