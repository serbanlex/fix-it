module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("Client", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });
    Client.associate = (models) => {
        Client.hasMany(models.Order);
        Client.belongsTo(models.User);
    };
    return Client;
};
