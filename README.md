# NutriPlan AI

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT">
  <img src="https://img.shields.io/badge/Next.js-13.4+-000000?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript" alt="TypeScript">
</p>

<p align="center">
  A modern, AI-powered meal planning SaaS platform that creates personalized nutrition plans based on your preferences, dietary restrictions, and health goals.
</p>

## ✨ Features

- **AI-Powered Meal Plans**: Generate personalized weekly meal plans tailored to your dietary preferences, restrictions, and health goals.
- **Smart Recipe Suggestions**: Discover new recipes that align with your nutritional needs and ingredient preferences.
- **Nutritional Analysis**: Track macro and micronutrient intake with detailed nutritional breakdowns for each meal.
- **Automated Grocery Lists**: Generate consolidated shopping lists based on your meal plan with smart ingredient grouping.
- **Dietary Restriction Support**: Comprehensive support for various diets including keto, paleo, vegan, vegetarian, gluten-free, and more.
- **Meal Plan Customization**: Easily swap meals, adjust portions, or replace ingredients to suit your preferences.
- **Recipe Collection**: Save your favorite recipes and create custom collections for easy access.
- **Progressive Web App**: Install on any device for a native app-like experience.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database (or your preferred database)
- OpenAI API key (for AI meal planning features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/NeelPrime/nextjs-saas-ai-meal-plan.git
cd nextjs-saas-ai-meal-plan
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Stripe (for subscription)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📱 Application Structure

```
├── app/               # Next.js App Router
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # User dashboard
│   ├── meal-plans/    # Meal planning features
│   └── ...
├── components/        # Reusable UI components
├── lib/               # Utility functions and services
│   ├── ai/            # AI-related functionality
│   ├── db/            # Database models and queries
│   └── ...
├── public/            # Static assets
└── ...
```

## 🧠 AI Integration

NutriPlan AI leverages OpenAI's GPT models to:

- Generate personalized meal plans based on user preferences
- Create recipes that match dietary requirements
- Suggest ingredient substitutions
- Provide nutritional insights and recommendations

## 💳 Subscription Model

NutriPlan AI offers multiple subscription tiers:

| Plan        | Features                                                                        | Price        |
| ----------- | ------------------------------------------------------------------------------- | ------------ |
| **Free**    | Basic meal planning, limited recipes                                            | Free         |
| **Basic**   | Personalized meal plans, grocery lists, recipe saving                           | $9.99/month  |
| **Premium** | Advanced nutritional analysis, unlimited recipe customization, priority support | $19.99/month |
| **Family**  | Multiple user profiles, family-sized meal plans, shared grocery lists           | $29.99/month |

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose (or your preferred database)
- **Authentication**: NextAuth.js
- **AI**: OpenAI GPT API
- **Payments**: Stripe
- **Deployment**: Vercel

## 📸 Screenshots

<p align="center">
  <em>Add screenshots of your application here when available</em>
</p>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Neel - [GitHub Profile](https://github.com/NeelPrime)

Project Link: [https://github.com/NeelPrime/nextjs-saas-ai-meal-plan](https://github.com/NeelPrime/nextjs-saas-ai-meal-plan)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/NeelPrime">NeelPrime</a>
</p>
