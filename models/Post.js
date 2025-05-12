export default (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "posts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                }
            },
        },
        {
            timestamps: true,
        }
    )
    return Post;

}