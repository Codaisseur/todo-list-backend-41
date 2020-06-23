const User = require("./models").user;
const TodoList = require("./models").todoList;
const TodoItem = require("./models").todoItem;
const Tag = require("./models").tag;

// findAll -> returns and [] with as many instances as it matches
// findOne => same as findAll but returns only one result.
// findByPk => find by ID, returns {} || null.
// findAndCountAll => for pagination.

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    console.log(users.map(u => u.get({ plain: true })));
  } catch (e) {
    console.log("error", e);
  }
};

const getAllLists = async () => {
  try {
    const lists = await TodoList.findAll();
    console.log(lists.map(u => u.get({ plain: true })));
  } catch (e) {
    console.log(e);
  }
};

const getAllImportantItems = async () => {
  try {
    const items = await TodoItem.findAll({
      where: { important: true },
    });
    console.log(items.map(u => u.get({ plain: true })));
  } catch (e) {
    console.log(e);
  }
};

const findUserById = async id => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: TodoList, include: [TodoItem] }],
    }); // {user} || null
    const plainUser = user.get({ plain: true });
    console.log(plainUser.todoLists[0].todoItems);
  } catch (e) {
    console.log("error", e);
  }
};
// findUserById(2);

const createUser = async ({ email, password, name }) => {
  try {
    const newUser = await User.create({ email, password, name });
    console.log(newUser.get({ plain: true })); // { email, password, name }
  } catch (e) {
    console.log("error", e);
  }
};

const deleteUser = async id => {
  try {
    const user = await User.findByPk(id);
    console.log(user.get({ plain: true }));
    await user.destroy();
  } catch (e) {
    console.log("error", e);
  }
};

const getItemWithTags = async id => {
  try {
    const item = await TodoItem.findByPk(id, { include: [Tag] });
    console.log(item.get({ plain: true }));
  } catch (e) {
    console.log(e);
  }
};

getItemWithTags(1);
