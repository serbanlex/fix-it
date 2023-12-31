const phoneValidationRegex = /\d{4}-\d{3}-\d{3}/;

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            validate: {
                validator: function (v) {
                    return phoneValidationRegex.test(v);
                }
            },
            allowNull: false,
            unique: true,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'https://firebasestorage.googleapis.com/v0/b/fix-it-4efd5.appspot.com/o/images%2Fusers%2F39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg?alt=media&token=12d89c90-c039-4ef8-a26a-e908cdcc0890'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    User.associate = (models) => {
        User.hasOne(models.Client, { foreignKey: 'ID', sourceKey: 'ID', as: 'clientInfo' });
        User.hasOne(models.ServiceOfferer, { foreignKey: 'ID', sourceKey: 'ID', as: 'serviceOffererInfo' });
    };
    return User;
};
