import { Thermometer, Clock, Wind, Eye } from "lucide-react";

export const getIconElement = (iconName: string) => {
  switch (iconName) {
    case "Thermometer":
      return <Thermometer className="w-4 h-4" />;
    case "Clock":
      return <Clock className="w-4 h-4" />;
    case "Wind":
      return <Wind className="w-4 h-4" />;
    case "Eye":
    default:
      return <Eye className="w-4 h-4" />;
  }
};
