module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("Service", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });
    Service.associate = (models) => {
        Service.belongsToMany(models.ServiceOfferer, {
            through: models.OfferedService,
            foreignKey: 'ServiceID'
          });
    };
    return Service;
};
