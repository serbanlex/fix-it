module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });
    Admin.associate = (models) => {
        Admin.belongsTo(models.User)
    };
    return Admin;
};
