import { FormControl, Grid, InputLabel, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { bookStatus, updateUserBookStatus } from "../services/userBooksService";

export default function UserBookStatus({ bookId, status, onStatusChange }) {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const [selected, setSelected] = useState(status ? status : "");
  let history = useHistory();

  const handleChange = async (event) => {
    if (userId) {
      const newSelection = event.target.value;

      // send update request & update selection
      updateUserBookStatus(userId, bookId, newSelection).then((res) =>
        setSelected(newSelection)
      );

      // emit event to parent
      onStatusChange(newSelection);
    } else {
      history.push("/login");
    }
  };

  return (
    <Grid item xs={3}>
      <FormControl fullWidth>
        {!selected ? (
          <InputLabel id="select-label">Add Book to Shelf</InputLabel>
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
    </Grid>
  );
}
