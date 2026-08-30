import { useContext } from "react";

//packages
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

//context
import { AiContext } from "../Ai.context";

// AI api
import {
  CreateReportApi,
  DeleteAReportApi,
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
      const res = await CreateReportApi(formdata);
      toast.success(res?.data?.message, { duration: 8000 });
      if (res.status === 201) navigate(`/report/${res.data.report._id}`);
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
    setAiloading(true);
    try {
      const report = await fetchReportbyidApi(id);
      if (report) setReport(report);
    } catch (error) {
      toast.error(error.message);
      console.log("handleFetchReportbyid ERR ::", error);
    } finally {
      setAiloading(false);
    }
  };

  const handleDeleteAReport = async (id) => {
    setAiloading(true);
    try {
      const res = await DeleteAReportApi(id);
      toast.success(res?.data?.message, { duration: 8000 });
    } catch (error) {
      toast.error(error.message);
      console.log("handleDeleteAReport ERR ::", error);
    } finally {
      setAiloading(false);
    }
  };

  return {
    Ailoading,
    Report,
    AllReport,
    handleCreateReport,
    handleFetchAllReport,
    handleFetchReportbyid,
    handleDeleteAReport,
  };
};

export default useAi;
