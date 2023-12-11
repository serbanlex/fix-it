module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("Review", {
        ID: {
        'type': Sequelize.INTEGER,
        'primaryKey': true,
        'autoIncrement': true,
        },
        rating: {
        'type': Sequelize.INTEGER,
        'allowNull': false,
        },
        comment: {
        'type': Sequelize.STRING,
        'allowNull': false,
        },
        imageUrl: {
        'type': Sequelize.STRING,
            'allowNull': true,
        }
    });


    Review.associate = (models) => {
        Review.belongsTo(models.Client);
        Review.belongsTo(models.Order);
    };
    return Review;
}