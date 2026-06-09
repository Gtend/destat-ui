// [Number]
// Visitors
// Live Surveys
// Archived Surveys

import { supabase } from "~/postgress/supaclient";
import TrendCard from "../components/trend-card";
import { TrendChart } from "../components/trend-chart";
import type { Route } from "./+types/dashboard";
import { DateTime } from "luxon";
import { getNumberData } from "../query";
// [Graph]
// time x Live Surveys
// time x Archived Surveys

const data = [
  { date: "2025-10-01", data: 186 },
  { date: "2025-10-02", data: 192 },
  { date: "2025-10-03", data: 178 },
  { date: "2025-10-04", data: 201 },
  { date: "2025-10-05", data: 195 },
  { date: "2025-10-06", data: 208 },
  { date: "2025-10-07", data: 214 },
  { date: "2025-10-08", data: 220 },
  { date: "2025-10-09", data: 217 },
  { date: "2025-10-10", data: 225 },
  { date: "2025-10-11", data: 231 },
  { date: "2025-10-12", data: 228 },
  { date: "2025-10-13", data: 240 },
  { date: "2025-10-14", data: 236 },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await supabase.rpc("increment_daily_visitor", {
    day: DateTime.now().startOf("day").toISO({ includeOffset: false }),
  });
  // console.log(data, error);
  const thisWeekStart = DateTime.now()
    .startOf("week")
    .toISO({ includeOffset: false });
  const thisWeekEnd = DateTime.now().toISO({ includeOffset: false });
  const lastWeekStart = DateTime.now()
    .startOf("week")
    .minus({ weeks: 1 })
    .toISO({ includeOffset: false });
  const { data: liveSurveyCount } = await supabase
    .from("daily_live_survey")
    .select("count, created_at")
    .order("created_at");
  // console.log(liveSurveyCount);
  let formedLivedSurveyCount = [{ date: "", data: 0 }];
  if (liveSurveyCount) {
    formedLivedSurveyCount = liveSurveyCount.map((c) => {
      return {
        date: c.created_at,
        data: c.count,
      };
    });
  }

  const numberCard = await getNumberData(
    lastWeekStart,
    thisWeekStart,
    thisWeekEnd,
  );
  return { ...numberCard, formedLivedSurveyCount };
  // const lastWeekEnd = thisWeekStart;
  // supabase.from("daily_visitor").select("count");
};

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-5 mt-10 w-full">
        <TrendCard
          title={"Total Visitors"}
          value={loaderData.value}
          trendValue={loaderData.trendValue + "%"}
          trendMessage={loaderData.upAndDown ? "Trending up" : "Trending down"}
          periodMessage="last 7 days"
        />
        <TrendCard
          title={"Live Surveys"}
          value={"123"}
          trendValue={"200%"}
          trendMessage={"Trending up"}
          periodMessage={"last 6 months"}
        />
        <TrendCard
          title="Archived Surveys"
          value="$1,250.00"
          trendValue="200%"
          trendMessage="Trending up"
          periodMessage="last 6 months"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5 w-full">
        <TrendChart
          title="Live Surveys"
          description="daily live survey count"
          trendMessage=""
          periodMessage=""
          chartData={loaderData.formedLivedSurveyCount}
        />
        <TrendChart
          title={"Archived Surveys"}
          description={"daily archived survey count"}
          trendMessage={""}
          periodMessage={""}
          chartData={data}
        />
      </div>
    </div>
  );
}
