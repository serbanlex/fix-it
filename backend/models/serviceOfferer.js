module.exports = (sequelize, Sequelize) => {
  const ServiceOfferer = sequelize.define("ServiceOfferer", {
    ID: {
        'type': Sequelize.INTEGER,
        'primaryKey': true
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
    ServiceOfferer.hasMany(models.Order);
    ServiceOfferer.belongsToMany(models.Service, {
      through: models.ServiceOffererServiceBind,
      foreignKey: 'ServiceOffererID'
    });
  };
  return ServiceOfferer;
};
