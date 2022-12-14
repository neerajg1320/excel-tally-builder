import {format, isDate as fnsIsDate} from "date-fns";

const isoDateFormat = "yyyy-MM-dd";
const localDateFormat = "dd/MM/yyyy";

export function isString(val) {
  return (typeof val === 'string' || val instanceof String)
}

export function isDate(val) {
  // Kept for reference
  // return val instanceof Date && !isNaN(val)

  return fnsIsDate(val);
}

export function valToString(val) {
  if (isDate(val)) {
    return format(val, localDateFormat);
  }

  // console.log(`typeof val: ${typeof val} ${val}`)
  return val.toString();
}