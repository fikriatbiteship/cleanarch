const mongoose = require("mongoose");
const UserEntity = require("../../../Entity/User");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.UUID,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toEntity = function () {
  return new UserEntity({
    id: this.id,
    username: this.username,
    encryptedPassword: this.encryptedPassword,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  });
};

module.exports = mongoose.model("User", userSchema);
