import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // or react-router-dom

// compo
import BackgroundGrid from "../components/BackgroundGrid";
import Sidebar from "../components/Sidebar";
import RightSidePanel from "../components/RightSidePanel";
import QuestionsCompo from "../components/QuestionsCompo";
import PrepPlanCompo from "../components/PrepPlanCompo";

// custom hook
import useAi from "../hooks/useAi.hook";

const ReportPage = () => {
  const { id } = useParams();

  const { handleFetchReportbyid, Ailoading, Report } = useAi();

  // Tab State
  const [activeTab, setActiveTab] = useState("technical"); // 'technical' | 'behavioral' | 'prepplan'

  useEffect(() => {
    if (id) {
      handleFetchReportbyid(id);
    }
  }, [id]);

  return (
    <BackgroundGrid>
      {/* Loading State */}
      {Ailoading || !Report ? (
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-primary"></div>
            <p className="animate-pulse text-xl font-bold text-neutral-300">
              Loading Report...
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full overflow-hidden text-neutral-50">
          {/* Left Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} id={id} />

          {/* Main Content Area */}
          <main className="h-full flex-1 overflow-y-auto scroll-smooth pl-2">
            <div className="px-2 py-10">
              <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12">
                {/* Center Column: Dynamic Content */}
                <div className="flex flex-col lg:col-span-9">
                  {activeTab === "technical" && (
                    <QuestionsCompo
                      title="Technical Questions"
                      description={`Focus on coding, system design, and technical concepts tailored to your ${Report.title} profile.`}
                      questions={Report.technicalQuestions}
                    />
                  )}

                  {activeTab === "behavioral" && (
                    <QuestionsCompo
                      title="Behavioral Questions"
                      description={`Focus on soft skills and non-technical interview questions tailored to your ${Report.title} experience.`}
                      questions={Report.behavioralQuestions}
                    />
                  )}

                  {activeTab === "prepplan" && (
                    <PrepPlanCompo plan={Report.preparationPlan} />
                  )}
                </div>

                {/* RightSide Compo MatchSocure and SkillGap*/}
                <RightSidePanel
                  matchScore={Report.matchScore}
                  skillGaps={Report.skillGap}
                  title={Report.title}
                />
              </div>
            </div>
          </main>
        </div>
      )}
    </BackgroundGrid>
  );
};

export default ReportPage;
