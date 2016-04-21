var pg = require('pg');

var connectionString;

if(process.env.DATABASE_URL) {
  pg.defaults.ssl =true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/patronus_handler';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connection to DB!', err);
      process.exit(1);
    } else {
      var createPeople = client.query('CREATE TABLE IF NOT EXISTS people (' +
      'id SERIAL PRIMARY KEY,' +
      'first_name varchar(80) NOT NULL,' +
      'last_name varchar(80) NOT NULL);'
    );
    createPeople.on('end', function(){
      console.log('People query done');
      done();
    });
    createPeople.on('error', function(){
      console.log('Error creating peopleSchema');
      process.exit(1);
    });
    var createPatronus = client.query('CREATE TABLE IF NOT EXISTS patronus (' +
    'id SERIAL PRIMARY KEY,' +
    'patronus_name varchar(80) NOT NULL);'
  );
  createPatronus.on('end', function(){
    console.log('Patronus query done!');
    done();
  });
  createPatronus.on('error', function(){
    console.log('Error creating patronusSchema');
    process.exit(1);
  });
}
})
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
