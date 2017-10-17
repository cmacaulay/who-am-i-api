
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE traits(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    description TEXT,
    size INTEGER,
    created_at TIMESTAMP
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE traits`
  return knex.raw(dropQuery)
};
