import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  password: string;
  instrument: string;
}

// Create the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
});

// Export the model using the IUser interface
export default mongoose.model<IUser>('User', userSchema);
