import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/sign-in(.*)",
  "/subscribe(.*)",
  "/api/webhook(.*)",
  "/api/check-subscription(.*)",
]);

const isSignUpSignInPageRoutes = createRouteMatcher([
  "/sign-up(.*)",
  "/sign-in(.*)",
]);

const isMealPlanRoute = createRouteMatcher(["/mealplan"]);

export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const { userId } = userAuth;
  const { pathname, origin } = req.nextUrl;
  console.log("Middleware Info", userId, pathname, origin);

  if (pathname === "/api/check-subscription") {
    return NextResponse.next();
  }

  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-up", origin));
  }
  if (isSignUpSignInPageRoutes(req) && userId) {
    return NextResponse.redirect(new URL("/mealplan", origin));
  }
  if (isMealPlanRoute(req) && userId) {
    try {
      const resp = await fetch(
        `${origin}/api/check-subscription?userId=${userId}`
      );
      const data = await resp.json();
      if (!data.subscriptionActive) {
        return NextResponse.redirect(new URL("/subscribe", origin));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL("/subscribe", origin));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
