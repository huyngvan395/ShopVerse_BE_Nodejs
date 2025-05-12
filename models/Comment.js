export default (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "comments",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Post',
                    key: 'id',
                }
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
    return Comment;
}