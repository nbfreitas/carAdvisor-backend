import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

import databaseConfig from '../config/database';

require('dotenv').config();

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/carAdvisor',
      { useNewUrlParser: true, useFindAndModify: true },
    );
  }
}

export default new Database();
