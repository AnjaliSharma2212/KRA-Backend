const userService = require("../services/users.service")

exports.getUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = userService.createUser(name);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const updated = userService.updateUser(req.params.id, req.body.name);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};