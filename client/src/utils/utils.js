const dateFormat = require("dateformat");

export const capitalize = (title) => {
  // let newTitle = title.slice();
  title = title.toString();
  return title.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
};

export const dateFormatter = (dateString) => {
  const date = new Date(dateString);

  return dateFormat(date, "mmm d, yyyy ");
};
