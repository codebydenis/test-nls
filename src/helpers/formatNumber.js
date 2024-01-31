export default (number) => {
  const parts = number.toFixed(2).toString().split(".");
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "." + parts[1];
};
