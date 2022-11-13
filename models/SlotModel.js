import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// *************** Define Model ***************
const Slot = sequelize.define("Slot", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  slot: {
    type: DataTypes.STRING,
  },
  slotStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "F",
  },
  parkingTime: {
    type: DataTypes.DATE,
  },
  userStatus: {
    type: DataTypes.STRING,
  },
});

export default Slot;
