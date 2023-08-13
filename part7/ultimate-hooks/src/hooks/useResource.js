import { useEffect, useState } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = (resource) => {
    axios.post(baseUrl, resource).then((response) => {
      return response.data;
    });

    setResources([...resources, resource]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
