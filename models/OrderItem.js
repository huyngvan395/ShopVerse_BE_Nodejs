export default (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
        "order_items",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            orderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'orders',
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
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
        },
        {
            timestamps: true,
        }
    )

    return OrderItem;
}