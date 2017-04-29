import rethink from 'rethinkdbdash';

const r = rethink();
const DB = 'app';

export default function newsFeedHandler(req, res, next) {
  r.db(DB)
    .table('articles')
    .then((articles) => {
      res.send(articles);
    })
    .error((e) => {
      next(new Error(e));
    });
}
