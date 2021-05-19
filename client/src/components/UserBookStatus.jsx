import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from "react";
import {bookStatus} from '../services/userBookService'


export default function UserBookStatus({ status, onStatusChange }) {

  const [selected, setSelected]  = useState(status?status: '');

  const handleChange = (event) =>{

    setSelected(event.target.value);
    // emit event to parent
    onStatusChange(event.target.value);
  }

  return (
      <Select
        value={selected}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}

      >
        {/* construct the menu items */}
        {Object.values(bookStatus)
        .map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}

      </Select>
  )

}