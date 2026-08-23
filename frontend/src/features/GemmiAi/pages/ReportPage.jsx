import React, { useEffect } from "react";

//custom hook
import useAi from "../hooks/useAi.hook";

// package
import { useParams } from "react-router";

const ReportPage = () => {
  const { id } = useParams();
  const { handleFetchReportbyid } = useAi();

  useEffect(() => {
    handleFetchReportbyid(id);
  }, []);

  return <div className="text-neutral-50">SingleReportPage</div>;
};

export default ReportPage;
