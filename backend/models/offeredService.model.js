module.exports = (sequelize, DataTypes) => {
    const OfferedService = sequelize.define('OfferedService', {
      price: DataTypes.FLOAT
    });
  
    OfferedService.associate = (models) => {
      OfferedService.belongsTo(models.ServiceOfferer);
      OfferedService.belongsTo(models.Service);
    };
  
    return OfferedService;
  };