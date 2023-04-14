module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: { model: 'User', key: 'id', onDelete: 'CASCADE' }
        },
    });
    Admin.associate = (models) => {
        Admin.belongsTo(models.User)
    };
    return Admin;
};
