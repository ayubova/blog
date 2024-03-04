import {NextRequest} from "next/server";
import InterviewStat from "models/InterviewStat";
import dbConnect from "lib/dbConnect";

export const POST = async (req:NextRequest) => {
  const {timeSpent, category} = await req.json();
  await dbConnect();

  const newTimeSpent = new InterviewStat({
    timeSpent, category
  });

  await newTimeSpent.save();

  return new Response(JSON.stringify({timeSpent: newTimeSpent}), {status: 200})

};


export const GET = async () => {
  try {
    await dbConnect();
      
    const interviewStats = await InterviewStat.find()
      
    return new Response(JSON.stringify({interviewStats}), {status: 200})
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};