module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("Service", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        serviceCategoryID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A category ID is required'
                },
                notEmpty: {
                    msg: 'A category ID is required'
                }
            }
        }
    });
    Service.associate = (models) => {
        Service.belongsToMany(models.ServiceOfferer, {
            through: models.OfferedService,
            foreignKey: 'ServiceID'
        });
        Service.hasOne(models.ServiceCategory, {
            foreignKey: 'ServiceID', as: 'category'
        })
    };
    return Service;
};
