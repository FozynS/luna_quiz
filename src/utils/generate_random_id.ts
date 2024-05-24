const generateRandomId = (): number => {
  const min = 0;
  const max = Math.floor(Date.now());
  const randomIndex = Math.floor(Math.random() * (max - min)) + min;
  return randomIndex;
}

export default generateRandomId