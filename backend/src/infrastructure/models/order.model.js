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
  },{
    getterMethods: {
      async isAwaitingReview() {
        // Access the associated OfferedService and Reviews
        const offeredService = await this.getOfferedService();
        const reviews = await offeredService.getReviews();

        // Check if there is no review matching the Order's ClientID
        const orderClientID = this.ClientID; // Assuming you have a ClientID field in Order model
        return !reviews.some(review => review.ClientID === orderClientID);
      },
    }
      }

      );
  Order.associate = (models) => {
    Order.belongsTo(models.Client);
    Order.belongsTo(models.OfferedService);
  };
  return Order;
};
