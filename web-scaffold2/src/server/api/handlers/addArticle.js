import rethink from 'rethinkdbdash';
import moment from 'moment';

const r = rethink();
const DB = 'app';

export default function addArticleHandler(req, res) {
  const { article } = req.body;
  console.log({
    ...article,
    timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
  });
  r.db(DB).table('articles').insert({
    ...article,
    timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
  }, {
    conflict: 'replace',
  }).run()
  .then((success) => {
    res.statusCode = 200;
    res.send(success);
  });
}
