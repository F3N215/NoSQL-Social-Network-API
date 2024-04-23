const { get } = require("mongoose");
const { Bytes, User } = require("../models");

// module.exports = byteController = {
//   // get all bytes
//   async getAllBytes(req, res) {
//     try {
//       const dbByteData = await Bytes.find({}).select("-__v").sort({ _id: -1 });
//       res.json(dbByteData);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Failed to get bytes" });
//     }
//   },
//   // create new byte
//   async createByte(req, res) {
//     try {
//       const dbByteData = await Bytes.create(req.body);
//       const user = await User.findOne({ username: req.body.username });
//       user.bytes.push(dbByteData._id);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },
// };

const ByteController = {
  async getAllBytes(req, res) {
    try {
      const bytes = await Bytes.find({}).select("-__v").sort({ _id: -1 });
      res.json(bytes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get bytes by id handler
  async getBytesById(req, res) {
    try {
      const byte = await Bytes.findOne({ _id: req.params.byteId });
      if (!byte) {
        res.status(404).json({ message: "Byte not found" });
      } else {
        res.json(byte);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create bytes by id handler
  async createByte(req, res) {
    try {
      const byte = await Bytes.create(req.body);
      res.status(201).json(byte);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete bytes by id handler
  async deleteByte(req, res) {
    try {
      const byte = await Bytes.findByIdAndDelete({
        _id: req.params.byteId,
      });
      res.status(200).json(byte);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update bytess by id handler
  async updateByteById(req, res) {
    try {
      const byte = await Bytes.findByIdAndUpdate(req.params.byteId, req.body, {
        new: true,
      });
      if (!byte) {
        res.status(404).json({ message: "Byte not found, where is the Byte?" });
      } else {
        res.json(byte);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create reaction handler
  async createReaction(req, res) {
    try {
      const byte = await Bytes.findOneAndUpdate(
        { _id: req.params.byteId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      byte ? res.json(byte) : res.status(404).json({ message: notFound });
    } catch (e) {
      res.status(500).json(e);
    }
  },

  async deleteReaction(req, res) {
    try {
      const byte = await Bytes.findOneAndUpdate(
        { _id: req.params.byteId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      byte ? res.json(byte) : res.status(404).json({ message: notFound });
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
// Export ByteController
module.exports = ByteController;
