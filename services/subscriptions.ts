import { SubscribeError, SubscribeResponse } from "@/types/subscriptions";

export async function fetchSubscriptionsStatus() {
  const resp = await fetch("/api/profile/subscription-status");
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.error || "Failed to fetch subscription status.");
  }
  return await resp.json();
}
export async function unsubscribe() {
  const resp = await fetch("/api/profile/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.error || "Failed to unsubscribe.");
  }
  return await resp.json();
}

export async function updatePlan(newPlan: string) {
  const resp = await fetch("/api/profile/change-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPlan }),
  });
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.error || "Failed to change subscription plan.");
  }
  return await resp.json();
}

export async function subscribeToPlan(
  planType: string,
  userId: string,
  email: string
): Promise<SubscribeResponse> {
  const resp = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planType,
      userId,
      email,
    }),
  });
  if (!resp.ok) {
    const errorData: SubscribeError = await resp.json();
    throw new Error(errorData.error || "Something went wrong");
  }

  const data: SubscribeResponse = await resp.json();
  return data;
}
