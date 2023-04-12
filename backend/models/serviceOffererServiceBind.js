module.exports = (sequelize, Sequelize) => {
    const ServiceOffererServiceBind = sequelize.define("ServiceOffererServiceBind", {
    });
    ServiceOffererServiceBind.associate = (models) => {
        ServiceOffererServiceBind.belongsTo(models.ServiceOfferer);
        ServiceOffererServiceBind.belongsTo(models.Service);

    };
    return ServiceOffererServiceBind;
};
