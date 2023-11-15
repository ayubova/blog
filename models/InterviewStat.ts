import {Schema, model, models, ObjectId, Model} from "mongoose";

export interface InterviewStatModelSchema {
  _id: ObjectId;
  timeSpent: number;
  category: string;
}

const InterviewStatSchema = new Schema<InterviewStatModelSchema>(
  {
    timeSpent: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const InterviewStat = models?.InterviewStat || model("InterviewStat", InterviewStatSchema);

export default InterviewStat as Model<InterviewStatModelSchema>;
