module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: { model: 'Users', key: 'ID', onDelete: 'CASCADE' }
        },
    });
    Admin.associate = (models) => {
        Admin.belongsTo(models.User)
    };
    return Admin;
};
