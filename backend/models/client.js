module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("Client", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: { model: 'Users', key: 'ID', onDelete: 'CASCADE'} 
        },
    });
    Client.associate = (models) => {
        Client.hasMany(models.Order);
        Client.belongsTo(models.User, {foreignKey: 'ID', targetKey: 'ID'});
    };
    return Client;
};
