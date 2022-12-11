import './style.css';

function DynamicTable({columns, data}) {

  return (
    <div className="table-wrapper">
      <table className="table table-striped">
        <thead>
        <tr>
          { columns && columns.map(col => <th scope="col">{col.title}</th>)}
        </tr>
        </thead>
        <tbody>
        {data && data.map((row, index) =>
            <tr key={index}>
              { columns && columns.map(col => <td>{row[col.key]}</td>)}
            </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;