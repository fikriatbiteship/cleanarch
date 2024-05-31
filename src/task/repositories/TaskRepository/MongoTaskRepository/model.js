const mongoose = require("mongoose");
const Task = require("../../../entity/Task");
const TaskStatus = require("../../../values/TaskStatus");

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.UUID,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: TaskStatus.values(),
    },
    userId: {
      type: mongoose.SchemaTypes.UUID,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.methods.toEntity = function () {
  return new Task({
    id: this.id,
    name: this.name,
    status: new TaskStatus(this.status),
    userId: this.userId,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  });
};

module.exports = mongoose.model("Task", taskSchema);
