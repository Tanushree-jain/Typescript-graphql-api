import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database'; 

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string; 
    public password!: string; 
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
}, {
    sequelize,
    tableName: 'users',
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('User table created successfully!');
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    });

export default User;
