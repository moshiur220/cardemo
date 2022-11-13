import GateChild from "../models/GateModel.js";
class Gate {
  static getAll(req, res) {
    res.send("this is from class");
  }
  // insert new data
  static async postAdd(req, res) {
    const { slot } = req.body;
    try {
      const result = await GateChild.create({
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
      await GateChild.update(
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
      await GateChild.destroy({
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

export default Gate;
