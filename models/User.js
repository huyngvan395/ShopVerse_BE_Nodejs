export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatarUrl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            timestamps: true,
        }
    )
    return User;
}