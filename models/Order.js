export default (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "orders",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                }
            },
            totalAmount: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false,
            },
            recipientName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            recipientPhone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shippingAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    )
    return Order
}