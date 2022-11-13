import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// *************** Define Model ***************
const GateChild = sequelize.define("Gate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  gateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  slotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default GateChild;
