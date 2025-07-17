import RegisterForm from "@/components/Register/register-form";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#E1EEBC] to-white">
      <div className="w-full max-w-md pt-10 pb-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-[#328E6E] p-3 rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#328E6E]">TernakAja</h1>
          <p className="text-[#67AE6E] mt-1">Smart Livestock Monitoring</p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
