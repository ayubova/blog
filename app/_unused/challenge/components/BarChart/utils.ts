interface InterviewStat {
    _id: string;
    timeSpent: number;
    category: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface MonthlyData {
    label: string;
    totalTime: number;
    date: number;
  }
  
export const convertToMonthlyFormat = (interviewStats: InterviewStat[]): MonthlyData[] => {
  const monthlyData: { [key: string]: MonthlyData } = interviewStats.reduce((acc, record) => {
    const date = new Date(record.createdAt);
    const monthYearKey = `${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getFullYear()}`;
  
    acc[monthYearKey] = acc[monthYearKey] || {
      label: monthYearKey,
      totalTime: 0,
      date: date.getTime(),
    };
  
    acc[monthYearKey].totalTime += record.timeSpent;
  
    return acc;
  }, {} as { [key: string]: MonthlyData });
  
  return Object.values(monthlyData).sort((a, b) => a.date - b.date);
};
  