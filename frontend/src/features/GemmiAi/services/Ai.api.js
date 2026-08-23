import { api } from "../../auth/services/Api.intances.js";

// Handle APi Err
const handleApiError = (error) => {
  throw {
    message: error.response?.data?.message || "Something went wrong at Server",
    status: error.response?.status || 500,
  };
};

export const CreateReportApi = async (formdata) => {
  try {
    const res = await api.post("/aiservice/create-report", formdata);
    return res.data?.report;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAllReportApi = async () => {
  try {
    const res = await api.get("/aiservice/getallreport");
    return res.data?.AllReport;
  } catch (error) {
    handleApiError(error);
  }
};
export const fetchReportbyidApi = async (id) => {
  try {
    const res = await api.get(`/aiservice/getreport/${id}`);
    return res.data?.report
  } catch (error) {
    handleApiError(error);
  }
};


