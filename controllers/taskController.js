import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/taskModel.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.json({
        message: "Please fill all the details",
      });
    }

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const allTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    task.isCompleted = !task.isCompleted;
    if (!task) return next(new ErrorHandler("Not found", 404));
    await task.deleteOne();

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    task.isCompleted = !task.isCompleted;

    if (!task) return next(new ErrorHandler("Not found", 404));

    await task.save();

    res.json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    next(error);
  }
};
