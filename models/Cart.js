export default (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        "carts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
        },
        {
            timestamps: true,
        }
    )
    return Cart;
}