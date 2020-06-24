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

# REST (REpresentational State Transfer)

REST => has many principles about what make an API RESTful

RESTful API => follows the REST principles.

3 main principles:

- Operations as HTTP methods
- Responses with correct status codes
- clean and meaningful URLs

1. Operations as HTTP methods.
   => GET, POST, DELETE, PUT, PATCH
   => CRUD => Create, READ, Update, Delete

Create: POST,
READ: GET,
DELETE: Delete,
Update: PATCH, PUT => PUT (replaces the entire object with the new)
PATCH (only updated recived fields)

2. Respond with appropiate status codes:

   200... => success => everything is ok!
   300... => Redirection => no longer here
   400... => user errors => you screwed up!
   500... => server errors => I screwed up!

200 => success!
404 => not found
401 => unauthorized
500 => internal server error.

3. Clean and meaningful URLS:

- `/users` => GET || POST
- `/users/:id`

- `/sendEmail` => RPM endpoints => Remote Procedure Call

REMEMBER:
Endpoints are defined as the _combination_ of url + HTTP Method

app.get(`/users`) => GET + '/users'
app.post(`/users`) => POST + '/users'

# Middleware

- Request can go through multiple "stages"
- "enter the shop" -> "grab a shopping cart" -> "items in basket" -> "checkout" -> "leave"
- "validate" (does request contain what we expect?) -> "handle request" (query database) -> "log" (what happened)
- Middleware in express are functions you can use to share behaviour between so routes
- That way we don't repeat ourselves

Middleware example

```javascript
function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  console.log("WHAT IS THIS?", req.params);

  if (isNaN(id)) {
    // returning to stop the request
    return res.status(400).send({ message: "id is not a number, sorry" });
  }

  next();
}
```

Use like so:

```javascript
app.get("/users/:id", validateId, async (req, res, next) => {
   // handle request here
}
```

# The order of middleware matters!

So use middlewares like `express.json()` before you load the rest of you routes
