import config from "../../../Config/Env.config.js";

// packages
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

// zod schema validation
const ReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    ),
  technicalQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe(
            "This are the technical questions can be asked in the interview",
          ),
        objective: z
          .string()
          .describe("Reason behind asking this question in the interview"),
        answer: z
          .string()
          .describe(
            "How to answer this question and what approach to take while answering this question etc..",
          ),
      })
      .describe(
        "Technical questions that can be asked in the interview along with their intention and how to answer them",
      ),
  ),
  behavioralQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe(
            "This are the behavioral questions can be asked in the interview",
          ),
        objective: z
          .string()
          .describe("Reason behind asking this question in the interview"),
        answer: z
          .string()
          .describe(
            "How to answer this question and what approach to take while answering this question etc..",
          ),
      })
      .describe(
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
      ),
  ),
  skillGap: z.array(
    z
      .object({
        skill: z
          .string()
          .describe(
            "This are the skill that the candidate is lacking and need to improve for the targeted job role",
          ),
        prioritylevel: z
          .enum(["low", "medium", "high"])
          .describe(
            "This is the priority level of the skill that the candidate is lacking and need to learn or improve first for the targeted job role",
          ),
      })
      .describe(
        "List of skill gaps in the candidate's profile along with their priority level ",
      ),
  ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focusArea: z
          .string()
          .describe(
            "The specific area of focus for that day, such as a particular skill or topic to study",
          ),
        tasks: z
          .array(z.string().min(1, "Task cannot be empty"))
          .min(1, "Tasks array cannot be empty")
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc. dont give empty tasks ",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_AI_API_KEY,
});

/**
 *
 * @name : GenerateAiReport
 * @description: Function to generate AI report based on the provided job description, self-description, and resume.
 */
const GenerateAiReport = async ({
  jobDescription,
  selfDescription,
  resume,
}) => {
  const prompt = `
You are an interview preparation expert.
Analyze the candidate details below and generate a report strictly according to the provided schema.

 Important Note: 
- if candidate has provided both resume or self-description along wiht job description, then analyze both resume and self-description and job description to generate the report. 
- if candidate has provided only resume or self-description along with job description, then analyze the provided resume or self-description and job description to generate the report.
- Return only valid JSON.
- Make the report practical, role-specific, and focused on interview readiness.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
  const res = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(ReportSchema),
    },
  });

  return JSON.parse(res.text);
};

export default GenerateAiReport;
