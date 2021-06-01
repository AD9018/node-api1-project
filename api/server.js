// BUILD YOUR SERVER HERE

const express = require("express");

const User = require("./users/model.js");

const server = express();

server.use(express.json());

server.post("/api/users/:id", (req, res) => {
  const newUser = req.body;
  
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.insert(newUser)
      .then((user) => res.status(201).json(user))
      .catch(
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        })
      );
  }
});


server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch(() => {
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" })
    );
});


server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates.name || !updates.bio) {
    res
      .status(400)
      .json({ message: " Please provide name and bio for the user" });
  } else {
    User.update(id, updates)
      .then((updatedUser) => {
        if (!updatedUser) {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        } else {
          res.json(updatedUser);
        }
      })
      .catch(() =>
        res
          .status(500)
          .json({ message: "The user information could not be modified " })
      );
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(deletedUser);
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "The user information could not modified" })
    );
});

module.exports = server;
