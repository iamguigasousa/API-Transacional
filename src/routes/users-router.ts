import express from "express";
import User from "../models/User";
import usersRepository from "../repositories/users-repository";

const usersR = express.Router();

usersR.post("/user", (req, res) => {
  const user: User = req.body as User;
  usersRepository.addNew(user, (id) => {
    if (id) {
      res.status(201).location(`/user/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

usersR.get("/user", (req, res) => {
  usersRepository.getAllItems((itens) => res.json(itens));
});

usersR.get("/user/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.getById(id, (user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).send();
    }
  });
});

usersR.put("/user/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

usersR.delete("/user/:id", (req, res) => {
  const id: number = +req.params.id;
  usersRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default usersR;
