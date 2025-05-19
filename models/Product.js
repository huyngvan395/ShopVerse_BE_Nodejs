export default (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "products",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'categories',
                    key: 'categoryId',
                }
            },
            rating: {
                type: DataTypes.DECIMAL(3, 2),
                defaultValue: 0
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }
    )

    return Product;
}