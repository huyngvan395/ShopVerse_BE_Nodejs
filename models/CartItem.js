export default (sequelize, DataTypes) => {
    const CartItem = sequelize.define(
        "cart_items",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cartId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'carts',
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
            isSelected: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
        }
    )
    return CartItem;
}