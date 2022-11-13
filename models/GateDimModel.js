import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// *************** Define Model ***************
const GateParent = sequelize.define("Gatedim", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  gate: {
    type: DataTypes.STRING,
  },
});

export default Slot;
