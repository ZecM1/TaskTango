export const saveToLocalStorage = (data) => {
  const name = data.username;
  const fullKey = `TaskTango_${name}`;
  window.localStorage.setItem(fullKey, JSON.stringify(data));
  // console.log('Data saved to local storage: ', fullKey, '  ', data);
  return;
};
