const mongoose = require("mongoose");
const TaskSummary = require("../../../entity/TaskSummary");

const taskSummarySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.UUID,
    },
    todoCount: {
      type: Number,
      required: true,
      default: 0,
    },
    ongoingCount: {
      type: Number,
      required: true,
      default: 0,
    },
    doneCount: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: mongoose.SchemaTypes.UUID,
    },
  },
  {
    timestamps: true,
  }
);

taskSummarySchema.methods.toEntity = function () {
  return new Task({
    id: this.id,
    todoCount: this.todoCount,
    ongoingCount: this.ongoingCount,
    doneCount: this.doneCount,
    userId: this.userId,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  });
};

module.exports = mongoose.model("TaskSummary", taskSummarySchema);
