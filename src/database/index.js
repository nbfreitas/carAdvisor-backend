import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../models/User';

import databaseConfig from '../config/database';

require('dotenv').config();

const models = [User];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m7x8o.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true },
    );
  }
}

export default new Database();
