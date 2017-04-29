import rethink from 'rethinkdbdash';
import moment from 'moment';

const r = rethink();
const DB = 'app';

export default function newsFeedHandler(req, res, next) {
  r.db(DB)
    .table('articles')
    .then((articles) => {
      res.send({
        articles,
        time: moment().format('DD/MM/YYYY, h:mm a'),
      });
    })
    .error((e) => {
      next(new Error(e));
    });
}
