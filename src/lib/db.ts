import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

  if (global._mongooseConn) return global._mongooseConn;

  const opts: mongoose.ConnectOptions = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  };

  global._mongooseConn = mongoose.connect(MONGODB_URI, opts);
  return global._mongooseConn;
}
