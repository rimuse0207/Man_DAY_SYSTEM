export const isValidPassword = (password) => {
  return !/['`{}]/.test(password);
};
