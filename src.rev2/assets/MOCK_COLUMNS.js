import {valToString} from "../utils/types";

// id is required for Table component

export const MOCK_COLUMNS = [
  {
    id: 'Id',
    Header: 'Id',
    Footer: 'Id',
    key: 'id',
    disableFilters: true,
  },
  {
    id: 'first_name',
    Header: 'First Name',
    Footer: 'First Name',
    key: 'first_name'
  },
  {
    id: 'last_name',
    Header: 'Last Name',
    Footer: 'Last Name',
    key: 'last_name'
  },
  {
    id: 'date_of_birth',
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    key: 'date_of_birth',
    Cell: ({ value }) => {
      return  valToString(new Date(value));
    }
  },
  {
    id: 'country',
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
    id: 'phone',
    Header: 'Phone',
    Footer: 'Phone',
    key: 'phone',
    edit: true,
    bulk: true,
    type: "input",
  },
  {
    id: 'remarks',
    Header: 'Remarks',
    Footer: 'Remarks',
    key: 'remarks',
    edit: true,
    bulk: true,
    type: "input"
  }
];

