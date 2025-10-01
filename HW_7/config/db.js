import { Sequelize } from 'sequelize';
import configData from './config.cjs';

import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const config = configData[env];

console.log(JSON.stringify(config));

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

export default sequelize;