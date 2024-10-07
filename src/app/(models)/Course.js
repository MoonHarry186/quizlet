import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const courseScheama = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        cards: [
          {
            type: Schema.Types.ObjectId,
            ref: "Card", // Refers to the "Card" model
          },
        ],
        // author: {
        //   type: Schema.Types.ObjectId,
        //   ref: "User", // Refers to the "User" model
        //   required: true,
        // },
      },
      {
        timestamps: true, // Adds createdAt and updatedAt fields
      }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseScheama);

export default Course;
