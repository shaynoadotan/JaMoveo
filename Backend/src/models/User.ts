import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  password: string;
  instrument: string;
  isAdmin: boolean;  
}

// Create the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },  // Add default false
});

// Export the model
export default mongoose.model<IUser>('User', userSchema);
