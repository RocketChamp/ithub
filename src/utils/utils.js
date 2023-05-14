export const getLocalStorageUser = () => {
  return (
    JSON.parse(localStorage.getItem("profile"))?.result ||
    JSON.parse(localStorage.getItem("profile"))
  );
};

export const getRandomColor = (saturation = 50, lightness = 40) => {
  return `hsl(${Math.random() * 360}, ${saturation}%, ${lightness}%)`;
};
