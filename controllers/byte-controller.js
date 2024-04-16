const { Byte, User, Reaction } = require("../models");
const { Types } = require("mongoose");

// Defines the ByteController object, which contains methods for handling various API requests related to thoughts
const ByteController = {
  async getAllBytes(req, res) {
    try {
      const bytes = await Byte.find({});
      res.json(bytes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get bytes by id handler
  async getBytesById(req, res) {
    try {
      const byte = await Byte.findOne({ _id: req.params.byteId });
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
      const byte = await Byte.create(req.body);
      res.status(201).json(byte);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete bytes by id handler
  async deleteByte(req, res) {
    try {
      const byte = await Byte.findByIdAndDelete({
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
      const byte = await Byte.findByIdAndUpdate(req.params.byteId, req.body, {
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
      const byte = await Byte.findOneAndUpdate(
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
      const byte = await Byte.findOneAndUpdate(
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
