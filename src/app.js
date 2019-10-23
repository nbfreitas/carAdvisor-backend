/* eslint-disable global-require */
import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    const app = require('http').Server(this.server);
    const io = require('socket.io')(app);

    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
    );

    this.server.use((req, res, next) => {
      req.io = io;

      next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
