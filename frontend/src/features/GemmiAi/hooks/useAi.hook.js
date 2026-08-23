import { useContext } from "react";

//packages
import { toast } from "react-hot-toast";
//context
import { AiContext } from "../Ai.context";

// AI api
import { CreateReportApi, fetchAllReportApi } from "../services/Ai.api";

const useAi = () => {
  const {
    Ailoading,
    setAiloading,
    Report,
    setReport,
    AllReport,
    setAllReport,
  } = useContext(AiContext);

  const handleCreateReport = async (formdata) => {
    setAiloading(true);
    try {
      const report = await CreateReportApi(formdata);
      if (report) setReport(report);
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

  return {
    Ailoading,
    Report,
    AllReport,
    handleCreateReport,
    handleFetchAllReport,
  };
};

export default useAi;
