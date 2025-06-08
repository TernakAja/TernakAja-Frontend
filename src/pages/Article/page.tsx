'use client';

import HealthcareArticles from "@/components/Article/healthcare-articles";
import FeaturedHealthTip from "@/components/Article/featured-health-tip";

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#328E6E] mb-2">Livestock Healthcare</h1>
          <p className="text-[#67AE6E] max-w-2xl mx-auto">
            Essential information and resources to help you maintain the health and wellbeing of your livestock.
          </p>
        </div>

        <FeaturedHealthTip />

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#328E6E] mb-6">Healthcare Articles</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="bg-[#328E6E] text-white px-4 py-1 rounded-full text-sm">All</button>
            <button className="bg-[#E1EEBC] text-[#328E6E] px-4 py-1 rounded-full text-sm hover:bg-[#90C67C] transition-colors">
              Preventive Care
            </button>
            <button className="bg-[#E1EEBC] text-[#328E6E] px-4 py-1 rounded-full text-sm hover:bg-[#90C67C] transition-colors">
              Nutrition
            </button>
            <button className="bg-[#E1EEBC] text-[#328E6E] px-4 py-1 rounded-full text-sm hover:bg-[#90C67C] transition-colors">
              Disease Management
            </button>
            <button className="bg-[#E1EEBC] text-[#328E6E] px-4 py-1 rounded-full text-sm hover:bg-[#90C67C] transition-colors">
              Seasonal Care
            </button>
          </div>

          <HealthcareArticles />
        </section>
      </main>
    </div>
  );
}
