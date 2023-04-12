module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        },
        phoneNumber: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    User.associate = (models) => {
        User.hasOne(models.Admin)
    };
    return User;
};
