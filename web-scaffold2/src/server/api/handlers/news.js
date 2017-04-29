import rethink from 'rethinkdbdash';


const r = rethink();

export default function newsFeedHandler(req, res, next) {
    res.send(r.db('App').table('Articles'));
}
