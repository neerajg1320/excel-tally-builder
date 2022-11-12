// const dateformat = require('dateformat');

function JSDateToExcelDate(inDate) {
  const returnDateTime = 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
  return returnDateTime.toString().substr(0,5);

}
function ExcelDateToJSDate(date) {
  let jsDate;
  try {
    jsDate = new Date(Math.round((date - 25569)*86400*1000));
  } catch (e) {
    console.error('Error converting excel date');
  }
  return jsDate;
}

module.exports = {
  ExcelDateToJSDate,
  JSDateToExcelDate
}