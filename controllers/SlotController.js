import SlotModel from "../models/SlotModel.js";
class Slot {
  static async getAll(req, res) {
    try {
      const result = await SlotModel.findAll();
      res.send(result);
    } catch (error) {
      res.send("there are has some problem");
    }
  }
  // insert new data
  static async postAdd(req, res) {
    const { slot } = req.body;
    try {
      const result = await SlotModel.create({
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
      await SlotModel.update(
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
      await SlotModel.destroy({
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

export default Slot;
