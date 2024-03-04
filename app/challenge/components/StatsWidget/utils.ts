import {InterviewStat} from "types";

interface ExtendedInterviewStat extends InterviewStat {
  parsedCreatedAt: Date;
}

export const getWeeksInPeriod = (interviewStats: InterviewStat[]): number => {
  // Step 1: Convert the createdAt timestamps to Date objects
  const convertedData: ExtendedInterviewStat[] = interviewStats.map((item) => ({
    ...item,
    parsedCreatedAt: new Date(item.createdAt),
  }));

  // Step 2: Find the earliest and latest dates
  const earliestDate = Math.min(...convertedData.map((item) => item.parsedCreatedAt.getTime()));
  const latestDate = Math.max(...convertedData.map((item) => item.parsedCreatedAt.getTime()));

  // Step 3: Calculate the difference between the latest and earliest dates in milliseconds
  const timeDifference = latestDate - earliestDate;

  // Step 4: Calculate the number of weeks in the period
  return Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
};

export const toHoursAndMinutes = (totalMinutes: number): string => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}h ${padTo2Digits(Math.round(minutes))}m`;
};

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}
