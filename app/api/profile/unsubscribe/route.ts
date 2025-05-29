import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser?.id) {
      return NextResponse.json({ error: "Unauthorized" });
    }
    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUser.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "No profile found" });
    }
    if (!profile?.stripSubscriptionId) {
      return NextResponse.json({ error: "No Active Subscription Found" });
    }

    const subscriptionId = profile.stripSubscriptionId;

    const canceledSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    );

    await prisma.profile.update({
      where: { userId: clerkUser.id },
      data: {
        subscriptionTier: null,
        stripSubscriptionId: null,
        subscriptionActive: false,
      },
    });

    return NextResponse.json({ subscription: canceledSubscription });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
