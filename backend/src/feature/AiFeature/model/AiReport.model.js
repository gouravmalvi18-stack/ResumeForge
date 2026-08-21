import mongoose, { Schema, model } from "mongoose";

const TechnicalQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "question is required"],
    },
    objective: {
      type: String,
      required: [true, "objective is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  },
);
const BehavioralQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "question is required"],
    },
    objective: {
      type: String,
      required: [true, "objective is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  },
);

const SkillGapSchema = new Schema(
  {
    skill: {
      type: String,
      required: [true, "skill is required"],
    },
    prioritylevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "prioritylevel is required"],
    },
  },
  {
    _id: false,
  },
);

const PreparationPlanSchema = new Schema(
  {
    day: {
      type: Number,
      required: [true, "day is required"],
    },
    focusArea: {
      type: String,
      required: [true, "focusArea is required"],
    },
    tasks: [
      {
        type: String,
        required: [true, "task is required"],
      },
    ],
  },
  {
    _id: false,
  },
);
// main Schema
const AiReportSchema = new Schema(
  {
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    selfDescription: {
      type: String,
    },
    resume: {
      type: String,
    },
    technicalQuestions: [TechnicalQuestionSchema],
    behavioralQuestions: [BehavioralQuestionSchema],
    skillGap: [SkillGapSchema],
    preparationPlan: [PreparationPlanSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: [true, "User ID is required"],
    },
    title : {
      type: String,
      required: [true, "Title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const AiReportModel = model("aiReports", AiReportSchema);
export default AiReportModel;
