let pg = require("pg");

let config = {
  user: 'postgres',
  database: 'ECP',
//  database: 'ecp',
  password: 'postgremdp',
//  password: 'carpool',
  port: 5432
//  ,host:'bdd.easy-carpool.com'
};

let pool = new pg.Pool(config);

console.log("Connexion");

module.exports = pool;
