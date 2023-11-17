/* eslint-disable react/no-unescaped-entities */
import type {NextPage, InferGetStaticPropsType, GetStaticProps} from "next";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {CiEdit} from "react-icons/ci";
import {toast} from "react-toastify";
import {StatsWidget} from "./components/StatsWidget"
import TimeRegisterModal from "./components/TimeRegisterModal";
import {BarChart} from "components/common/BarChart";
import {DefaultLayout} from "components/layout/DefaultLayout";
import {getTagsCollection} from "lib/utils";
import ActionButton from "components/ui/ActionButton";
import useAuth from "hooks/useAuth";
import {InterviewStat} from "types";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Challenge: NextPage<Props> = ({tags}: Props) => {
  const [interviewStats, setInterviewStats] = useState<InterviewStat[]>([]);
  const [timeRegisterModalOpen, setTimeRegisterModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user} = useAuth();

  const isAdmin = user && user.role === "admin";

  const calculateTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const totalMinutes = Number(hours) * 60 + Number(minutes);
    return totalMinutes;
  };

  const handleTimeRegister = async (time: string, category: string) => {
    const timeSpent = calculateTime(time);
    setLoading(true);
    await axios
      .post("/api/challenge/interview", {timeSpent, category})
      .then(({data}) => {
        toast.success("Time record is saved");
        fetchInterviewStats();
        return data;
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("error:",err)
      })
      .finally(() => {
        setLoading(false)
        setTimeRegisterModalOpen(false)
      });
  };

  const fetchInterviewStats = async () => {
    try {
      const {data} = await axios("/api/challenge/interview");
      setInterviewStats(data.interviewStats);
      return data.interviewStats;
    } catch (error) {
      console.log("error:",error)
    }
  };

  useEffect(() => {
    fetchInterviewStats();
  }, []);

  return (
    <DefaultLayout tags={tags}>
      <div className="py-10 md:px-10 px-4 max-w-7xl w-full">
        <div className="mb-10 grid md:grid-cols-2 grid-cols-1 md:gap-x-10 gap-y-10">
          <StatsWidget interviewStats={interviewStats} />

          <div className="w-60 justify-self-end">
            <ActionButton
              disabled={!isAdmin}
              onClick={() => setTimeRegisterModalOpen(true)}
              title={"New time record"}
              icon={<CiEdit size={24} />}
              tip={!isAdmin ? "For admin only" : ""}
            />

            <TimeRegisterModal
              handleTimeRegister={handleTimeRegister}
              isOpen={timeRegisterModalOpen}
              handleClose={() => setTimeRegisterModalOpen(false)}
              loading={loading}
            />
          </div>
        </div>

        <div className="leetcode grid md:grid-cols-2 grid-cols-1 md:gap-x-10 gap-y-10 items-center">
          <div className="h-full">
            <iframe
              src="https://leetcard.jacoblin.cool/juliaayubova?&font=Roboto%20Serif&ext=heatmap"
              className="md:h-[380px] h-[240px] w-full"
              frameBorder="1"
            />
          </div>
          <div className="min-w-full bg-white border border-slate-200 rounded p-4 h-full max-h-[374px]">
            <BarChart interviewStats={interviewStats} />
          </div>
        </div>
      </div>

      {/* <div>
        Logs
        {interviewStats.map(item => (
          <div key={item.id} className="flex gap-x-8">
            <div>{dateFormat(item.createdAt, "mmm d, yyyy")}
            </div>
            <div>{item.timeSpent}</div>
            <div>{item.category}</div>
          </div>
        ))}
      </div> */}
    </DefaultLayout>
  );
};

export default Challenge;

interface StaticPropsResponse {
  tags: string[];
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  {slug: string}
> = async () => {
  try {
    const tags = await getTagsCollection();
    return {
      props: {
        tags,
      },
    };
  } catch (error) {
    return {notFound: true};
  }
};
