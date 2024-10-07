import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const cardSchema = new Schema(
    {
        term: { 
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        definition: {
          type: String,
          required: true,
        },
        image: String, // Optional image URL or path
        example: String
      },
      {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
      }
);

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema);

export default Card;
