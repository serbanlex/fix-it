module.exports = (sequelize, Sequelize) => {
  const ServiceOfferer = sequelize.define("ServiceOfferer", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'Users', key: 'ID', onDelete: 'CASCADE' }
    },
    firmName: {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    firmCity: {
      'type': Sequelize.STRING,
      'allowNull': false
    },
    firmAddress: {
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
    ServiceOfferer.belongsTo(models.User, { foreignKey: 'ID', targetKey: 'ID', as: 'userInfo', onDelete: 'CASCADE' });
    ServiceOfferer.hasMany(models.Order);
    ServiceOfferer.hasMany(models.OfferedService, { as: 'offeredServices' });
  };
  return ServiceOfferer;
};
