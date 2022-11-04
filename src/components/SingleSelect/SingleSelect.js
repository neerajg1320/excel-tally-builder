import Form from 'react-bootstrap/Form';
import './style.css';

function SingleSelect({options, onChange, defaultValue}) {
  const handleChange = (e) => {
    // console.log('SingleSelect:handleChange', e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
      <div className="select-wrapper">
        <Form.Select aria-label="Default select example" onChange={handleChange} defaultValue={defaultValue}>
          {/*<option>Open this select menu</option>*/}
          {
            options && (
                options.map((opt, index) =>
                    <option
                        key={index}
                        value={opt.value}
                        // selected={defaultValue ? (opt.value == defaultValue ? true : false) : false}
                    >
                      {opt.label}
                    </option>
                )
              )
          }
        </Form.Select>
      </div>
  );
}

export default SingleSelect;