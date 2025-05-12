export default (sequelize, DataTypes) =>  {
    const Review = sequelize.define(
        "reviews",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            productId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'products',
                    key: 'id',
                }
            },
        },
        {
            timestamps: true,
        }
    )
    return Review;
}