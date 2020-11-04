const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000/api';
const request = async ({ method, params = '', data = '' }) => {
  const token = window.localStorage.getItem('token');

  const config = {
    method,
    url: `${params}`,
    headers: {
      Authorization: `bearer ${token}`,
    },
    data,
  };

  const result = await axios(config);
  return result;
};

export default request;
