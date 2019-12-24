import axios from 'axios';

export default async token => {
  const result = await axios.get('http://localhost:4000/secure', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};
