export interface Plan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export const availablePlans: Plan[] = [
  {
    name: "Weekly Plan",
    amount: 9.99,
    currency: "USD",
    interval: "week",
    description:
      "Great for testing the power of AI-driven meal planning with short-term flexibility.",
    features: [
      "Unlimited AI meal plans",
      "AI Nutrition Insights",
      "Cancel Anytime",
    ],
  },
  {
    name: "Monthly Plan",
    amount: 39.99,
    currency: "USD",
    interval: "month",
    isPopular: true,
    description:
      "Perfect for ongoing optimization with monthly access to intelligent nutrition coaching and AI customization.",
    features: [
      "Unlimited AI meal plans",
      "AI Nutrition Insights",
      "Priority AI support",
      "Cancel Anytime",
    ],
  },
  {
    name: "Yearly Plan",
    amount: 299.99,
    currency: "USD",
    interval: "year",
    description:
      "Best Value: a full year of premium AI guidance, habit building, and health transformation.",
    features: [
      "Unlimited AI meal plans",
      "AI Nutrition Insights",
      "All premium features",
      "Cancel Anytime",
    ],
  },
];

const priceIDMap: Record<string, string> = {
  week: process.env.STRIPE_PRICE_WEEKLY!,
  month: process.env.STRIPE_PRICE_MONTHLY!,
  year: process.env.STRIPE_PRICE_YEARLY!,
};

export const getPriceIdFromType = (planType: string) => priceIDMap[planType];
