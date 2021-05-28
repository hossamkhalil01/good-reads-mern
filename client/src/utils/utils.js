export const capitalize = (title) => {
  console.log(title);
  title = title.toString();
  return title.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
};
