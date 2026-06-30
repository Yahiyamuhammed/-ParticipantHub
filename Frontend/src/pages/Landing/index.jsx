import MainLayout from "@/layouts/MainLayout";

import Header from "@/features/landing/components/Header";
import Hero from "@/features/landing/components/Hero";
import LoginCard from "@/features/landing/components/LoginCard";

function LandingPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <Header />

        <Hero />

        <LoginCard />
      </div>
    </MainLayout>
  );
}

export default LandingPage;