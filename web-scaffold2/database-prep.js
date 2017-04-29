import rethink from 'rethinkdbdash';

const DB = 'app';
const r = rethink();

const createTable = () => {
  r.db(DB)
.tableList()
.run()
.then((data) => {
  if (!data.includes('articles')) {
    console.log('Could not find jobs table...creating');
    r.db(DB).tableCreate('articles').run();
  }
  r.getPoolMaster().drain();
});
};

r.dbList().run()
.then((data) => {
  if (!data.includes(DB)) {
    console.log('Could not find App database...creating');
    r.dbCreate(DB)
      .run()
      .then(() => {
        createTable();
      });
  } else {
    createTable();
  }
});

