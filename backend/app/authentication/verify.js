export default (username, password) => (
  username === password
    ? Promise.resolve({ username })
    : Promise.reject()
);
