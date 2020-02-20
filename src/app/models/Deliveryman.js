import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  // calling init method from model class
  static init(sequelize) {
    super.init(
      // object that contains all values that delyiveryman will receive
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );

    return this;
  }

  // table relationships
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
