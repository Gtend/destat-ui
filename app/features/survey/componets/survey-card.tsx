import { EyeIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default function SurveyCard({
  title,
  description,
  view,
  count,
  image,
  address,
}: {
  title: string;
  description: string;
  view: number;
  count: number;
  image: string;
  address: string;
}) {
  return (
    // <Link to="/survey/surveyId">
    <Link to={`/survey/${address}`}>
      <Card className="max-w-96">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row text-xs gap-0.5">
                <EyeIcon size={17} /> {view}
              </div>
              <div className="flex flex-row text-xs gap-0.5">
                <UsersIcon size={17} /> {count}
              </div>
            </div>
          </div>

          <CardDescription className="line-clamp-2 min-h-10">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="rounded-2xl"
            // src={"https://avatars.githubusercontent.com/u/86248339?s=96&v=4"}
            // src={"https://avatars.githubusercontent.com/u/18018028?v=4"}
            src={image}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Link to={`/survey/${address}`}>Join</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
