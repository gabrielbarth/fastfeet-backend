import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // does not exists on database
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Hooks are code snippets that runs automatically
    // based on actions inside our model
    this.addHook('beforeSave', async user => {
      // check is user password exists. If true tranforms the password into password_hash
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // checking if password exists - comparing the informed to that added on database
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
