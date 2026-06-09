import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { rabbykit } from "~/root";
import WalletButton from "./wallet-button";

// - navigation
// - Dashboard
// - Survey
//     - All surveys
//     - Create survey
// - Archive
//     - Finished surveys
// - Profile
//     - My surveys
//     - My responses

// - wallet connector kits
//   - rainbowkit
//   - appkit
//   - rabbykit
//   - ..

export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 left-0">
      <div className="flex w-screen items-center justify-between py-5 px-5">
        <Link to="/" className="text-lg font-bold">
          DESTAT
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Survey</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2 h-[150px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="text-lg font-medium">shadcn/ui</div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind
                          CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/survey/all">
                        <div className="text-sm leading-none font-medium">
                          All surveys
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          List all surveys
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {/* <li>
                    <NavigationMenuLink asChild>
                      <a href="/survey/all">
                        <div className="text-sm leading-none font-medium">
                          All surveys
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          List all surveys
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li> */}
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/survey/create">
                        <div className="text-sm leading-none font-medium">
                          Create survey
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          Create survey
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Archive</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2 h-[150px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="text-lg font-medium">shadcn/ui</div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind
                          CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/archive/finish">
                        <div className="text-sm leading-none font-medium">
                          Finished surveys
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          Finished surveys
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2 h-[150px]">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-center rounded-md bg-linear-to-b no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="text-lg font-medium">shadcn/ui</div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Beautifully designed components built with Tailwind
                          CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/profile/survey">
                        <div className="text-sm leading-none font-medium">
                          My surveys
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          My surveys
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/profile/response">
                        <div className="text-sm leading-none font-medium">
                          My responses
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          My responses
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <WalletButton />
      </div>
    </nav>
  );
}
