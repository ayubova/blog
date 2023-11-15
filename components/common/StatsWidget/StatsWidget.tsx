import React, {useMemo} from "react"

import {getWeeksInPeriod, toHoursAndMinutes} from "./utils"
import {InterviewStat} from "types"

type Props = {
  interviewStats: InterviewStat[]
}

const StatsWidget = ({interviewStats}: Props) => {
  const timeSpent = useMemo(() => interviewStats.reduce(
    (acc, item) => item.timeSpent + acc,
    0
  ), [interviewStats])

  const total = useMemo(() => toHoursAndMinutes(timeSpent), [timeSpent])
  const averagePerWeek = useMemo(() => toHoursAndMinutes(timeSpent / getWeeksInPeriod(interviewStats)), [timeSpent, interviewStats])
  
  return (
    <div className="text-lg bg-white border border-slate-200 rounded p-4 w-full space-y-8">
      <div>
        <p className="uppercase text-secondary-dark">Total time spent</p>
        <p className="text-4xl">{total}</p>
      </div>
      <div>
        <p className="uppercase text-secondary-dark">
        Average time per week
        </p>
        <p className="text-4xl">
          {averagePerWeek}
        </p>
      </div>
    </div>
  )
}

export default StatsWidget