import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
    },
    avatar: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpiry: {
      type: Date
    }
  },
  { timestamps: true }
);

/**
 * Hash password before saving
 */
userSchema.pre("save", async function () {
  // IMPORTANT: only hash if password is new or modified
  // this refers to user
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // auto-generate avatar only on first save
  if (!this.avatar) {
    this.avatar = `https://robohash.org/${this.username}?size=200x200`;
  }

  this.verificationToken = uuidv4().substring(0, 10).toUpperCase();
  this.verificationTokenExpiry = Date.now() + 3600 * 1000;

});

const User = mongoose.model("User", userSchema);
export default User;
