export default (sequelize, DataTypes) =>{
    const Address = sequelize.define(
        "addresses",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: 'users',
                    key: 'id',
                }
            },
            address:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            isDefault: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
        }
    )
    return Address;
}