import { ReactNode } from "react";
import { Clock } from "lucide-react";

interface ComingSoonProps {
  children: ReactNode;
  title?: string;
  description?: string;
  badgeText?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  children,
  title = "Coming Soon",
  description = "This feature will be available in an upcoming update.",
  badgeText = "Coming Soon",
}) => {
  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10"></div>

        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#328E6E] to-[#67AE6E] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {badgeText}
        </div>

        <div className="opacity-60 pointer-events-none">
          {children}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center bg-[#E1EEBC]/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#D5E8A3] max-w-xs">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full" style={{ background: "linear-gradient(to right, #328E6E, #67AE6E)" }}>
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-[#328E6E] mb-2">{title}</h3>
            <p className="text-sm text-[#4C6650]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
