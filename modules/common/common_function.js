
exports.getRandom = (length = 8) => {
  const word = 'abcdefghijklnmopqrsquvwxyz123456789';
  let random = '';
  for (let i = 0; i < length; i++) {
      random += word[Math.floor(Math.random() * length)];
  }
  return random;
};
