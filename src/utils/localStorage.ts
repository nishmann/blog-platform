export const getToken = () => {
  if (localStorage.getItem('token')) return localStorage.getItem('token');
  return false;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
  const result = getToken();
  if (result) return true;
  return false;
};
