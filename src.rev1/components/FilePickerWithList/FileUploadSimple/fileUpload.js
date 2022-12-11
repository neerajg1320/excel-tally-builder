import './style.css';

function FileUploadSimple({onChange, onClick}) {
  const handleSelectionChange = (e) => {
    console.log(`Selected Files: `, e.target.files);

    const filesArray =[]
    for (let i=0; i<e.target.files.length; i++) {
      filesArray.push(e.target.files[i]);
    }

    onChange(filesArray);
  }

  return (
      <div className="upload-box">
        <input className="upload-input" t
               type="file"
               onChange={handleSelectionChange}
               multiple/>
      </div>
  );
}

export default FileUploadSimple;