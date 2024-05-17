const mongoose = require("mongoose");
const Task = require("../../../entity/Task");

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.UUID,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.methods.toEntity = function () {
  return new Task({
    id: this.id,
    name: this.taskname,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  });
};

module.exports = mongoose.model("Task", taskSchema);
