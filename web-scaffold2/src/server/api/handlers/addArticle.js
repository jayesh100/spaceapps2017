import rethink from 'rethinkdbdash';

const r = rethink();
const DB = 'app';

export default function addArticleHandler(req, res) {
  const { article } = req.body;
  r.db(DB).table('articles').insert({
    ...article,
  }, {
    conflict: 'replace',
  }).run()
  .then((success) => {
    res.statusCode = 200;
    res.send(success);
  });
}
