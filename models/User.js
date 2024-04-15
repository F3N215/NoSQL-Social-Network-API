const { Schema, model, Types } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
      },
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // enables virtual properties to be displayed when a user document is transformed into JSON format
    },
    id: false, // disables the default '_id' field in the User model to be returned when calling toJSON() method
  }
);

// define virtual property 'friendCount' that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// Creating the User model from the userSchema
const User = model("User", userSchema);
// Exporting the User model as a module
module.exports = User;
