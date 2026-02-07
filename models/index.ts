import mongoose, { Schema, model, models } from 'mongoose';

// User Schema
export interface IUser {
  userId: string; // Clerk user ID
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model<IUser>('User', UserSchema);

// ChatSession Schema
export interface IChatSession {
  sessionId: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>({
  sessionId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Compound index for efficient user session queries
ChatSessionSchema.index({ userId: 1, updatedAt: -1 });

export const ChatSession = models.ChatSession || model<IChatSession>('ChatSession', ChatSessionSchema);

// ChatMessage Schema
export interface IChatMessage {
  sessionId: string;
  role: 'user' | 'assistant' | 'human' | 'ai';
  content: string;
  timestamp: Date;
  messageId?: string;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  sessionId: { type: String, required: true, index: true },
  role: { type: String, required: true, enum: ['user', 'assistant', 'human', 'ai'] },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  messageId: { type: String },
});

// Index for efficient message retrieval by session
ChatMessageSchema.index({ sessionId: 1, timestamp: 1 });

export const ChatMessage = models.ChatMessage || model<IChatMessage>('ChatMessage', ChatMessageSchema);
