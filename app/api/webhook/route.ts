import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
      }
      case "invoice.payment_failed": {
        const session = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(session);
      }
      case "customer.subscription.deleted": {
        const session = event.data.object as Stripe.Subscription;
        await handleCustomerSubscriptionDeleted(session);
      }
      default: {
        console.log("unhandled event type" + event.type);
      }
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({});
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.clerkUserId;
  if (!userId) {
    console.log("User Id is an invalid");
    return;
  }
  const subscriptionId = session.subscription as string;
  if (!subscriptionId) {
    console.log("Subscription Id is an invalid");
    return;
  }
  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        stripSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
const handleInvoicePaymentFailed = async (invoice: Stripe.Invoice) => {
  const subId = invoice.subscription as string;

  if (!subId) {
    return;
  }

  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: { stripSubscriptionId: subId },
      select: { userId: true },
    });
    if (!profile) {
      console.log("No Profile found.");
      return;
    }
    userId = profile.userId;
  } catch (error: any) {
    console.log(error.message);
  }

  try {
    await prisma.profile.update({
      where: { userId: userId },
      data: {
        subscriptionActive: false,
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
async function handleCustomerSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const subId = subscription.id;

  if (!subId) {
    return;
  }

  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: { stripSubscriptionId: subId },
      select: { userId: true },
    });
    if (!profile) {
      console.log("No Profile found.");
      return;
    }
    userId = profile.userId;
  } catch (error: any) {
    console.log(error.message);
  }

  try {
    await prisma.profile.update({
      where: { userId: userId },
      data: {
        subscriptionActive: false,
        stripSubscriptionId: null,
        subscriptionTier: "",
      },
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
