import UserModel from "../models/UserModel.js";
class User {
  static getAll(req, res) {
    res.send("this is from class");
  }
  // insert new data
  static async postAdd(req, res) {
    const { slot } = req.body;
    try {
      const result = await UserModel.create({
        slot,
      });
      result.save();
      res.send("New Data save");
    } catch (error) {
      res.send("data not save");
    }
  }
  // update by ID
  static async putUpdate(req, res) {
    const { slot } = req.body;
    try {
      await UserModel.update(
        { slot },
        {
          where: {
            id: 1,
          },
        }
      );
      res.send("data  update");
    } catch (error) {
      res.send("data not save");
    }
  }

  // Delete by ID
  static async deleteById(req, res) {
    const { slot } = req.body;
    try {
      await UserModel.destroy({
        where: {
          slot,
        },
      });
      res.send(req.body);
    } catch (error) {
      res.send("data not update");
    }
  }
}

export default User;
