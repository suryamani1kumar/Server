import mongoose, { Document, Schema } from "mongoose";

interface Itracking extends Document {
  device: string;
  lat: string;
  long: string;
  pageUrl: string;
  referrer: string;
  screenHeight: number;
  screenWidth: number;
  timeEnd: number;
  timeStart: number;
  eventTrigger: any[];
  userAgent: string;
}

const trackingSchema: Schema<Itracking> = new Schema(
  {
    device: { type: String },
    lat: { type: String },
    long: { type: String },
    pageUrl: { type: String },
    referrer: { type: String },
    screenHeight: { type: Number },
    screenWidth: { type: Number },
    timeEnd: { type: Number },
    timeStart: { type: Number },
    eventTrigger: {},
    userAgent: { type: String },
  },
  { timestamps: true }
);

export const tracking = mongoose.model("tracking", trackingSchema);
