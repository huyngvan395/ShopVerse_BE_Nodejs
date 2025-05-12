export default (sequelize, DataTypes) => {
    const Follow = sequelize.define(
        "follows",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            followerId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
                }
            },
            followingId: {
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
    return Follow
}