import mongoose, { Schema } from "mongoose";

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now, // Default to the current date if not provided
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the "User" model
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course", // Reference to the "Course" model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

export default Folder;
