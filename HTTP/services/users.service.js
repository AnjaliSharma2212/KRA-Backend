let users = [];

exports.getAllUsers = () => {
  return users;
};

exports.createUser = (name) => {
  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  return newUser;
};

exports.updateUser = (id, name) => {
  const user = users.find(u => u.id == id);

  if (!user) {
    throw new Error("User not found");
  }

  user.name = name;
  return user;
};

exports.deleteUser = (id) => {
  const index = users.findIndex(u => u.id == id);

  if (index === -1) {
    throw new Error("User not found");
  }

  users.splice(index, 1);
};