import axios from 'axios';

export default async function handler(req, res) {
  const { method, query } = req;

  // Replace with the Ergast API URL you want to proxy
  const apiUrl = 'https://ergast.com/api/f1/current.json';

  try {
    const apiResponse = await axios({
      method,
      url: apiUrl,
      params: query,
    });

    res.status(200).json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
}
