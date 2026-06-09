import SurveyCard from "../componets/survey-card";
// import { http, useReadContract } from "wagmi";
import { useReadContract } from "wagmi";
import { createPublicClient, getContract, http } from "viem";

import { SURVEY_ABI, SURVEY_FACTORY, SURVEY_FACTORY_ABI } from "../constant";
import { useEffect, useState } from "react";
import { hardhat } from "viem/chains";
// import { createPublicClient, getContract } from "viem";
import type { Route } from "./+types/all-survey";
import { supabase } from "~/postgress/supaclient";

interface SurveyMeta {
  title: string;
  description: string;
  count: number;
  view: number | null;
  image: string | null;
  address: string;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { data, error } = await supabase
    .from("all_survey_overview")
    .select("*");
  if (!error) {
    return data.map((s) => {
      return {
        title: s.title!,
        description: s.description!,
        view: s.view,
        count: s.count!,
        image: s.image,
        address: s.id!,
      };
    });
  } else {
    return [];
  }
};

// export default function AllSurveys() {
export default function AllSurveys({ loaderData }: Route.ComponentProps) {
  // const { data } = useReadContract({
  //   address: SURVEY_FACTORY,
  //   abi: SURVEY_FACTORY_ABI,
  //   functionName: "getSurveys",
  //   args: [],
  // });
  // // useEffect(() => {
  // //   console.log(data);
  // // }, [data]);
  const [surveys, setSurveys] = useState<SurveyMeta[]>(loaderData);
  const onChainLoader = async () => {
    const client = createPublicClient({
      chain: hardhat,
      transport: http(),
    });
    const surveyFactoryContract = getContract({
      address: SURVEY_FACTORY,
      abi: SURVEY_FACTORY_ABI,
      client,
    });

    const surveys = await surveyFactoryContract.read.getSurveys();
    console.log("testing");
    console.log("surveys:", surveys);
    const surveyMetaData = await Promise.all(
      surveys.map(async (surveyAddress) => {
        const surveyContract = getContract({
          address: surveyAddress,
          abi: SURVEY_ABI,
          client,
        });
        const title = await surveyContract.read.title();
        const description = await surveyContract.read.description();
        const answers = await surveyContract.read.getAnswers();
        return {
          title,
          description,
          count: answers.length,
          view: null,
          image: null,
          address: surveyAddress,
        };
        // console.log(title, description);
      }),
    );
    return surveyMetaData;
  };

  // const offChainLoader = async (): Promise<SurveyMeta[]> => {
  //   return [
  //     {
  //       title: "New Survey",
  //       description: "Override test",
  //       count: 10,
  //       view: 1600,
  //       image: "https://avatars.githubusercontent.com/u/18018028?v=4",
  //       address: "",
  //     },
  //   ];
  // };

  // useEffect(() => {
  //   const onchainData = async () => {
  //     const onchainSurveys = await onChainLoader();
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     setSurveys(onchainSurveys);
  //   };
  //   onchainData();
  //   // const offchainData = async () => {
  //   //   const onchainSurveys = await offChainLoader();
  //   //   setSurveys(onchainSurveys);
  //   // };
  //   // offchainData();
  // }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-extrabold">Live Surveys</h1>
        <span className="font-light">Join the surveys!</span>
      </div>
      {/* {Array.from({ length: 10 }).map((_, index) => (
        <SurveyCard key={index} />
      ))} */}
      {/* {Array.from({ length: 10 }).map(() => (
        <SurveyCard
          title={""}
          description={""}
          view={1600}
          count={58}
          image={"https://avatars.githubusercontent.com/u/18018028?v=4"}
        />
      ))}
       */}
      {surveys.map((survey) => (
        <SurveyCard
          title={survey.title}
          description={survey.description}
          view={survey.view!}
          count={survey.count}
          image={survey.image!}
          address={survey.address}
        />
      ))}
    </div>
  );
}
