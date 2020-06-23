# Setting up Sequelize:

1. modify config.json with db URL.
2. modify models/index.js to use "url".

## "rules" for generating models:

1. Model names always singular. model: story => table: stories
2. always start with lowercase (its going to avoid problems later).
3. Respect camelCase.

snake_case => python style
camelCase => JS style

# Models vs Migrations:

- Model is for our JS code
- Migration gets translated into the db as tables/columns
- Both get generated together
- Migrations have to be executed to have an effect on the database
- Migrations can de un-done.

# Seeders

- Files to insert test data to our app/db.

## queries

Most used methods:
// findAll -> returns and [] with as many instances as it matches
// findOne => same as findAll but returns only one result.
// findByPk => find by ID, returns {} || null.
// findAndCountAll => for pagination.

## N:N relationships (many to many)

1. Create join-table model with foreign keys for both entities to be joined
2. Alter join-table migration to specify foreign key references.
3. set up association between join-table and entities
4. set up association between entities themselves.
5. Seed and try out!
