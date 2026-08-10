//package
import { PDFParse } from "pdf-parse";

//service
import GenerateAibasedReport from "../services/AiService.js";

//model
import AiReportModel from "../model/AiReport.model.js";

/**
 * @name CreateReportController
 * @description Generate an AI-based report based on the user's resume or self-description ,
 *              along with job description.User can provide either resume or self-description or both.
 * @access private
 */
export const CreateReportController = async (req, res) => {
  try {
    const { jobDescription, selfDescription } = req.body;
    let resumeContent;

    if (req.file) {
      const buffer = req.file?.buffer;
      const parser = await new PDFParse({ data: buffer });
      resumeContent = await parser.getText();
    }

    if (!resumeContent && !selfDescription) {
      return res.status(400).json({
        message:
          "Either resume or self-description is required to generate the report.",
      });
    }
    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required to generate the report.",
      });
    }

    const AiGenerateReport = await GenerateAibasedReport({
      jobDescription,
      selfDescription,
      resume: resumeContent?.text,
    });

    if (AiGenerateReport) {
      const NewReport = await AiReportModel.create({
        jobDescription,
        selfDescription,
        resume: resumeContent?.text,
        ...AiGenerateReport,
      });

      res.status(201).json({
        message: "AI-based report generated successfully.",
        report: NewReport,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `CreateReportController ERR :: ${error}`,
    });
  }
};
