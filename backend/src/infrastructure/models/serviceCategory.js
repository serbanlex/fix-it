module.exports = (sequelize, Sequelize) => {
    const ServiceCategory = sequelize.define("ServiceCategory", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    ServiceCategory.associate = (models) => {
        ServiceCategory.hasMany(models.Service, {
            as: 'services', foreignKey: 'serviceCategoryID'
        });
    }
    return ServiceCategory;
}