module.exports = (sequelize, Sequelize) => {
  const ServiceOfferer = sequelize.define("ServiceOfferer", {
    ID: {
      'type': Sequelize.INTEGER,
      'primaryKey': true,
      references: { model: 'Users', key: 'ID', onDelete: 'CASCADE' }
    },
    firmName: {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    CUI: {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    CAEN: {
      'type': Sequelize.STRING,
      'allowNull': false
    }
  });
  ServiceOfferer.associate = (models) => {
    ServiceOfferer.belongsTo(models.User);
    ServiceOfferer.hasMany(models.Order);
    ServiceOfferer.hasMany(models.OfferedService);
  };
  return ServiceOfferer;
};
