import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  // calling init method from model class
  static init(sequelize) {
    super.init(
      // object that contains all values that recipient will receive
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
