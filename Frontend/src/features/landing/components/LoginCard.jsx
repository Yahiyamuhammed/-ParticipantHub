import { Camera, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

function LoginCard() {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">
            Participant Login
          </h3>

          <p className="mt-2 text-gray-500">
            Sign in using Face Recognition or your
            Registration Number.
          </p>
        </div>

        <Button
          className="flex items-center justify-center gap-2"
          onClick={() => navigate("/login")}
        >
          <Camera size={18} />

          Continue to Login
        </Button>

        <button
          className="mx-auto flex items-center gap-2 text-sm font-medium text-blue-600"
          onClick={() => navigate("/login")}
        >
          Registration Number Login

          <ArrowRight size={16} />
        </button>
      </div>
    </Card>
  );
}

export default LoginCard;