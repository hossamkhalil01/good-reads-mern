import { FormControl, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { bookStatus, getBookStatus, updateBookStatus } from "../services/userBooksService";
import { parsePaginatedResponse } from "../utils/pagination";


export default function UserBookStatus({ bookId, onStatusChange }) {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const [selected, setSelected] = useState("");
  let history = useHistory();

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
    if (userId) {
      const newSelection = event.target.value;

      // send update request & update selection
      updateBookStatus(bookId, newSelection).then((res) =>
        setSelected(newSelection)
      );
      // emit event to parent
      onStatusChange(newSelection);

    } else {
      history.push("/login");
    }
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
