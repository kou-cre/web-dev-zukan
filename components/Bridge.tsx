import { ArrowDown } from "lucide-react";

interface BridgeProps {
  from: string;
  to: string;
}

export function Bridge({ from, to }: BridgeProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 my-6 px-2">
      <p className="text-xs text-gray-500 text-center leading-relaxed">
        ここまで：<span className="text-gray-400">{from}</span>
      </p>
      <ArrowDown className="w-4 h-4 text-gray-600" />
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        次は：<span className="text-gray-300">{to}</span>
      </p>
    </div>
  );
}
