import { CalendarDays } from "lucide-react";

import Card from "@/components/common/Card";

function Hero() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} />

          <span className="text-sm font-medium">
            6 Day State Event
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight">
            Everything you need during the event.
          </h2>

          <p className="mt-3 text-blue-100">
            Login, explore competitions, check leaderboard,
            view results and navigate to stages.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Hero;