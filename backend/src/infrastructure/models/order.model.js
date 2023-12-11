module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    ID: {
      'type': Sequelize.INTEGER,
      'primaryKey': true,
      'autoIncrement': true,
    },
    state: {
      'type': Sequelize.ENUM('pending', 'in progress', 'done'),
      'allowNull': false,
    },
    date: {
      'type': Sequelize.DATE,
      'allowNull': false,
    },
    time: {
      'type': Sequelize.STRING,
      'allowNull': false,
    },
    description: {
      'type': Sequelize.STRING,
      'allowNull': false,
    },
    address: {
      'type': Sequelize.STRING,
      'allowNull': false,
    },
  });
  Order.associate = (models) => {
    Order.belongsTo(models.Client);
    Order.belongsTo(models.OfferedService);
    Order.hasOne(models.Review);
  };
  return Order;
};
