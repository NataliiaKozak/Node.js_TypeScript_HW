import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true, // Проверка на целое число
        min: 1000, // Минимальный год
        max: new Date().getFullYear(),
      },
    },
  },
  {
    tableName: 'books',
    timestamps: false,
  }
);

export default Book;