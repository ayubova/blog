import {NextApiHandler} from "next";
import InterviewStat from "models/InterviewStat";
import dbConnect from "lib/dbConnect";
import {readFile} from "lib/readFile";

export const config = {
  api: {bodyParser: false},
};

const handler: NextApiHandler = async (req, res) => {
  const {method} = req;
  switch (method) {
  case "GET":
    return readInterviewStat(req, res);
  case "POST":
    return registerTimeSpent(req, res);
  default:
    res.status(404).send("Not found");
  }
};

const registerTimeSpent: NextApiHandler = async (req, res) => {
  const {body} = await readFile<{timeSpent: number, category: string}>(req);
  const {timeSpent, category} = body;

  await dbConnect();

  const newTimeSpent = new InterviewStat({
    timeSpent, category
  });

  await newTimeSpent.save();

  res.json({timeSpent: newTimeSpent});
};

const readInterviewStat: NextApiHandler = async (req, res) => {
  try {
    await dbConnect();
      
    const interviewStats = await InterviewStat.find()
      
    res.json({interviewStats});
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
};
export default handler;
