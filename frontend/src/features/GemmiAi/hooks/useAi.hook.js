import { useContext } from "react";

//packages
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

//context
import { AiContext } from "../Ai.context";

// AI api
import {
  CreateReportApi,
  fetchAllReportApi,
  fetchReportbyidApi,
} from "../services/Ai.api";

/**
 * @name useAi
 * @description It's a custom hook which connect Ai context and Ai api's and also handle  loading
 * 
 * @returns  
    Ailoading,
    Report,
    AllReport,
    handleCreateReport,
    handleFetchAllReport,
    handleFetchReportbyid,
 */
const useAi = () => {
  const {
    Ailoading,
    setAiloading,
    Report,
    setReport,
    AllReport,
    setAllReport,
  } = useContext(AiContext);
  const navigate = useNavigate();

  const handleCreateReport = async (formdata) => {
    setAiloading(true);
    try {
      const report = await CreateReportApi(formdata);
      if (report) navigate(`/report/${report._id}`);
    } catch (error) {
      toast.error(error.message);
      console.log("handleCreateReport ERR ::", error.response);
    } finally {
      setAiloading(false);
    }
  };

  const handleFetchAllReport = async () => {
    try {
      const AllReport = await fetchAllReportApi();
      setAllReport(AllReport);
    } catch (error) {
      toast.error(error.message);
      console.log("handleFetchAllReport ERR ::", error);
    }
  };
  const handleFetchReportbyid = async (id) => {
    try {
      const report = await fetchReportbyidApi(id);
      if (report) setReport(report);
      console.log(report);
    } catch (error) {
      toast.error(error.message);
      console.log("handleFetchReportbyid ERR ::", error);
    }
  };

  return {
    Ailoading,
    Report,
    AllReport,
    handleCreateReport,
    handleFetchAllReport,
    handleFetchReportbyid,
  };
};

export default useAi;
