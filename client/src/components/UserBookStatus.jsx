import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from "react";
import {bookStatus, updateBookStatus} from '../services/userBookService'


export default function UserBookStatus({ bookId, status, onStatusChange }) {

  const [selected, setSelected]  = useState(status?status: '');

  const handleChange = (event) =>{

    const newSelection = event.target.value;

    // send update request ` 

    setSelected(newSelection);
    // emit event to parent
    onStatusChange(newSelection);
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