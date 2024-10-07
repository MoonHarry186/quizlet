import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        // password: {
        //   type: String,
        //   required: true,
        // },
        avatar: String, // Optional avatar field (e.g., image URL)
        email: {
          type: String,
          required: true,
          unique: true, // Ensure that emails are unique
        },
        // plan: {
        //   type: Schema.Types.ObjectId,
        //   ref: "Plan", // Reference to the "Plan" model
        // },
      },
      {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
      }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

