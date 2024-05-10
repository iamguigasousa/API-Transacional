import express from "express";
import Order from "../models/Order";
import ordersRepository from "../repositories/orders-repository";

const ordersR = express.Router();

ordersR.post("/orders", (req, res) => {
  const order: Order = req.body as Order;
  ordersRepository.addNew(order, (id) => {
    if (id) {
      res.status(201).location(`/orders/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

ordersR.get("/orders", (req, res) => {
  ordersRepository.getAllItems((orders) => res.json(orders));
});

ordersR.get("/orders/:id", (req, res) => {
  const id: number = +req.params.id;
  ordersRepository.getById(id, (order) => {
    if (order) {
      res.json(order);
    } else {
      res.status(404).send();
    }
  });
});

ordersR.put("/orders/:id", (req, res) => {
  const id: number = +req.params.id;
  ordersRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

ordersR.delete("/orders/:id", (req, res) => {
  const id: number = +req.params.id;
  ordersRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default ordersR;
