import axios from 'axios';

import config from '../../config';

export default function getArticles() {
  console.log(`${config.baseUrl}:${config.port}/api/newsfeed/`);
  return axios.get(`${config.baseUrl}:${config.port}/api/newsfeed/`)
    .then(articles => articles.data);
}
