'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-[#00c2cb] to-[#00b8d4] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">AI Meal Plan</h2>
          <p className="text-lg mb-6">
            Personalized meal plans powered by AI to simplify your cooking experience.
          </p>
          <p className="text-sm opacity-90">
            © {currentYear} AI Meal Plan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;