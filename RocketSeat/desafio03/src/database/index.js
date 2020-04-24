import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliverer from '../app/models/Deliverer';

import databaseConfig from '../config/database';

const models = [User, Recipient, Deliverer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection));
  }
}

export default new Database();
