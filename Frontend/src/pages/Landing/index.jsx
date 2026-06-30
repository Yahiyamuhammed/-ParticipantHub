import MainLayout from "@/layouts/MainLayout";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

function LandingPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <Section
          title="Participant Hub"
          subtitle="Your event companion"
        >
          <Card>
            <p className="mb-5 text-gray-600">
              Participant Login
            </p>

            <Button>
              Continue
            </Button>
          </Card>
        </Section>
      </div>
    </MainLayout>
  );
}

export default LandingPage;