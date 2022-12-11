import {valToString} from "../utils/types";

export const MOCK_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    key: 'id',
    disableFilters: true,
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    key: 'first_name'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    key: 'last_name'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    key: 'date_of_birth',
    Cell: ({ value }) => {
      return  valToString(new Date(value));
    }
  },
  {
    Header: 'Country',
    Footer: 'Country',
    key: 'country',
    edit: true,
    bulk: true,
    type: "select",
    choices: [
      "Select",
      "Australia",
      "India",
      "Indonesia",
      "Netherlands",
      "Chile",
      "Portugal",
      "UK",
      "US"
    ],
    defaultChoice: "India"
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    key: 'phone',
    edit: true,
    bulk: true,
    type: "input",
  },
  {
    Header: 'Remarks',
    Footer: 'Remarks',
    key: 'remarks',
    edit: true,
    bulk: true,
    type: "input"
  }
];

