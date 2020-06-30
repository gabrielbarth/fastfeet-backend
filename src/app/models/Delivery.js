import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  // calling init method from model class
  static init(sequelize) {
    super.init(
      // object that contains all values that delivery will receive
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );

    return this;
  }

  // table relationships
  // a delivery has a deliveryman, a recipient and could have a
  // receipment signature (image)
  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
