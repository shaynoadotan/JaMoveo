import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  instrument: string;
  isAdmin: boolean;
  role: 'singer' | 'player'; // Use a string literal type for the role
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // For admin users
  role: { type: String, enum: ['singer', 'player'], required: true }, // Add role for singer/player
});

const User = mongoose.model<IUser>('User', userSchema);
export default User; // Export the model as default
