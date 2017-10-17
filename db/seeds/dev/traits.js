
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE traits RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO traits(name, description, size, created_at) VALUES (?, ?, ?, ?)',
        ["Third Culture Kid", "American passport, raised in Germany.", 2, new Date]
      ),
      knex.raw(
        'INSERT INTO traits(name, description, size, created_at) VALUES (?, ?, ?, ?)',
        ["Theater", "I love theater because playwrights are great observers of important social issues.", 3, new Date]
      ),
      knex.raw(
        'INSERT INTO traits(name, description, size, created_at) VALUES (?, ?, ?, ?)',
        ["Politics", "There's nothing harder than working on a campaign", 3, new Date]
      ),
    ])
  })
};
