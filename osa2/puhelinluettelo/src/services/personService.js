import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const request = async (url, method, data) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.log('Error:', error);
  }
};

const getAll = () => request(baseUrl, 'get');
const create = (newObject) => request(baseUrl, 'post', newObject);
const remove = (id) => request(`${baseUrl}/${id}`, 'delete');
const update = (id, newObject) => request(`${baseUrl}/${id}`, 'put', newObject);

export default { getAll, create, remove, update };
