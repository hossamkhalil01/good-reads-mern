import { FormControl, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import { currentUser } from "../services/authService";
import { bookStatus, getBookStatus, updateBookStatus } from "../services/userBooksService";
import { parsePaginatedResponse } from "../utils/pagination";

const userId = currentUser._id;

export default function UserBookStatus({ bookId, onStatusChange }) {

  const [selected, setSelected] = useState("");

  useEffect(() => {

    const getInitBookStatus = async () => {
      // get the new page from api
      const { data: [shelfBook] } = parsePaginatedResponse(
        await getBookStatus(bookId)
      );

      if (shelfBook?.status) setSelected(shelfBook.status);
    }
    getInitBookStatus();
  }, [bookId])


  const handleChange = async (event) => {
    const newSelection = event.target.value;

    // send update request & update selection
    updateBookStatus(bookId, newSelection).then((res) =>
      setSelected(newSelection)
    );

    // emit event to parent
    onStatusChange(newSelection);
  };

  return (
    <FormControl fullWidth>
      {!selected ? (
        <InputLabel id="select-label">Add to Shelf</InputLabel>
      ) : (
        ""
      )}
      <Select
        labelId="select-label"
        value={selected}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {/* construct the menu items */}
        {Object.values(bookStatus).map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
