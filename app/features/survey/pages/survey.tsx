import { SendIcon, User2Icon } from "lucide-react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import MessageBubble from "../componets/message-bubble";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/survey";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { SURVEY_ABI } from "../constant";
import { ResourceNotFoundRpcError } from "viem";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  //   console.log(formData);
  const answers = Object.fromEntries(formData);
  //   console.log(answers);
  console.log(Object.values(answers).map((str) => Number(str)));
};

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "가장 좋아하는 계절은?",
    options: ["봄", "여름", "가을", "겨울"],
  },
  {
    question: "주로 사용하는 프로그래밍 언어는?",
    options: ["Python", "JavaScript", "Java", "C++"],
  },
  {
    question: "선호하는 개발 분야는?",
    options: ["웹", "모바일", "AI", "게임"],
  },
  {
    question: "주로 사용하는 운영체제는?",
    options: ["Windows", "macOS", "Linux", "기타"],
  },
  {
    question: "커피 취향은?",
    options: ["아메리카노", "라떼", "에스프레소", "마시지 않음"],
  },
  {
    question: "평소 공부하는 시간대는?",
    options: ["아침", "오후", "저녁", "새벽"],
  },
  {
    question: "가장 자주 사용하는 AI 도구는?",
    options: ["ChatGPT", "Claude", "Gemini", "Copilot"],
  },
  {
    question: "선호하는 개발 환경은?",
    options: ["VS Code", "IntelliJ", "Vim", "기타"],
  },
];

export default function Survey({ params }: Route.ComponentProps) {
  // useEffect(() => {
  //   console.log(params);
  // });
  const { data: questions } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "getQuestions",
    args: [],
  });
  const { data: title } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "title",
    args: [],
  });
  const { data: description } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "description",
    args: [],
  });

  const { writeContract } = useWriteContract();
  const { address } = useAccount();

  const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    if (!address) {
      alert("Please connect your wallet first before submitting answer");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const answers: number[] = [];
    for (const value of formData.values()) {
      answers.push(Number(value));
    }

    writeContract({
      address: params.surveyId as `0x{string}`,
      abi: SURVEY_ABI,
      functionName: "submitAnswer",
      args: [{ respondent: address, answers }],
    });
    // console.log(answers);
  };

  const { data: answers } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "getAnswers",
    args: [],
  });
  const { data: target } = useReadContract({
    address: params.surveyId as `0x{string}`,
    abi: SURVEY_ABI,
    functionName: "targetNumber",
    args: [],
  });
  const [counts, setCounts] = useState<number[][]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const countAnswers = () => {
    // 0: [0,0,0] --> 0: [1,0,0]
    // 1: [0,0,1]
    if (!target) return;
    return questions?.map((q, i) => {
      const count = Array.from({ length: q.options.length }).fill(
        0,
      ) as number[];
      answers?.map((answer) => count[answer.answers[i]]++);
      // return count;
      return count.map((n) => (n / Number(target)) * 100);
    });
  };

  useEffect(() => {
    if (!answers || !questions || !address) {
      return;
    }
    for (const answer of answers) {
      setCounts(countAnswers() || []);
      setIsAnswered(true);
      return;
    }
  }, [answers, address, target]);

  return (
    <div className="grid grid-cols-3 w-screen gap-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="font-extrabold text-3xl">
            {/* Sample Survey */}
            {title}
          </CardTitle>
          <CardDescription>
            {/* This is a sample survey. Let's join to get Rewards */}
            {description}
          </CardDescription>
        </CardHeader>
        {isAnswered ? (
          <CardContent className="overflow-y-auto h-[70vh]">
            <h1 className="font-semibold text-xl pb-4">Survey Progress</h1>
            <div className="gap-5 grid grid-cols-2">
              {questions?.map((q, i) => (
                <div className="flex flex-col">
                  <h1 className="font-bold">{q.question}</h1>
                  <div className="flex flex-col pl-2 gap-1">
                    {q.options.map((o, j) => (
                      <div className="flex flex-row justify-center items-center relative">
                        <div className="left-2 absolute text-xs font-semibold">
                          {o}
                        </div>
                        <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-400 w-14 h-5 rounded-full"
                            style={{ width: `${counts[i][j]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>
            {/* <Form method="post" className="grid grid-cols-2"> */}
            <Form onSubmit={submitAnswer} className="grid grid-cols-2">
              {questions?.map((q, i) => (
                <div className="flex flex-col">
                  <span className="mt-5 mb-1">{q.question}</span>
                  {q.options.map((o, j) => (
                    <div>
                      {" "}
                      <label className="flex items-center gap-1">
                        <Input
                          type="radio"
                          name={i.toString()}
                          value={j.toString()}
                          className="hidden peer"
                        ></Input>
                        <span className="w-4 h-4 rounded-full border-2 peer-checked:bg-primary"></span>
                        <span className="font-semibold">{o}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <Button type="submit" className="w-full mt-5">
                Submit
              </Button>
            </Form>
          </CardContent>
        )}
      </Card>
      <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 overflow-y-auto h-[70vh]">
          {Array.from({ length: 20 }).map((_, i) => (
            <MessageBubble sender={i % 2 === 0} />
          ))}
        </CardContent>
        <CardFooter className="w-full">
          <Form className="flex flex-row items-center relative w-full">
            <input
              type="text"
              placeholder="type a message..."
              className="border-1 w-full h-8 rounded-2xl px-2 text-xs"
            />
            <Button className="flex flex-row justify-center items-center w-3 h-3 absolute right-2">
              <SendIcon />
            </Button>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}
