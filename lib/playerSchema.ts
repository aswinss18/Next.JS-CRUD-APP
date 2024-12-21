import mongoose, { Schema, Document } from "mongoose";

interface IPlayer extends Document {
  name: string;
  desc: string;
  img: string;
}

const PlayerSchema: Schema<IPlayer> = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Player =
  mongoose.models.Player || mongoose.model<IPlayer>("Player", PlayerSchema);
export default Player;
