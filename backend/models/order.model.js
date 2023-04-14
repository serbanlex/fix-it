module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    ID: {
      'type': Sequelize.INTEGER,
      'primaryKey': true
    },
    state: {
      'type': Sequelize.ENUM('pending','in progress', 'done'),
      'allowNull': false,
    }
  });
  Order.associate = (models) => {
    Order.hasOne(models.Client);
    Order.hasOne(models.ServiceOfferer);
  };
  return Order;
};
