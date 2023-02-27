import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/persons',
});

const request = async (url, method, data) => {
  try {
    const response = await instance({ url, method, data });
    return response.data;
  } catch (error) {
    console.log('Error:', error);
  }
};

const getAll = () => request('', 'get');
const create = (newObject) => request('', 'post', newObject);
const remove = (id) => request(`/${id}`, 'delete');
const update = (id, newObject) => request(`/${id}`, 'put', newObject);

// eslint-disable-next-line
export default { getAll, create, remove, update };
