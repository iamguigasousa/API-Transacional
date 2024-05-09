import express from "express";
import Stock from "../models/Stock";
import stocksRepository from "../repositories/stocks-repository";

const stocksR = express.Router();

stocksR.post("/stocks", (req, res) => {
  const stock: Stock = req.body as Stock;
  stocksRepository.addNew(stock, (id) => {
    if (id) {
      res.status(201).location(`/stocks/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

stocksR.get("/stocks", (req, res) => {
  stocksRepository.getAllItems((stocks) => res.json(stocks));
});

stocksR.get("/stocks/:id", (req, res) => {
  const id: number = +req.params.id;
  stocksRepository.getById(id, (stock) => {
    if (stock) {
      res.json(stock);
    } else {
      res.status(404).send();
    }
  });
});

stocksR.put("/stocks/:id", (req, res) => {
  const id: number = +req.params.id;
  stocksRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

stocksR.delete("/stocks/:id", (req, res) => {
  const id: number = +req.params.id;
  stocksRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default stocksR;
