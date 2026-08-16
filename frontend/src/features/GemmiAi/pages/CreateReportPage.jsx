import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.hook";

const CreateReportPage = () => {
  // const { handleFetchAllReport } = useAuth();

  // useEffect(() => {
  //   handleFetchAllReport();
  // }, []);

  return (
    <div className="h-screen bg-neutral-950 pt-40 text-center text-6xl text-text-secondary">
      Welcome
    </div>
  );
};

export default CreateReportPage;
