import { format, addDays, startOfWeek, endOfWeek, compareAsc } from "date-fns";
import { dashboard as config } from "@/config";

export const today = new Date();

export const weekStartDate = startingDate => {
  if (!startingDate) {
    return format(startOfWeek(today, { weekStartsOn: 1 }), config.formatTimestampStartOfDay);
  } else {
    return format(startOfWeek(startingDate, { weekStartsOn: 1 }), config.formatTimestampStartOfDay);
  }
};

export const weekEndDate = endingDate => {
  if (!endingDate) {
    return format(endOfWeek(today, { weekStartsOn: 1 }), config.formatTimestampEndOfDay);
  } else {
    return format(endOfWeek(endingDate, { weekStartsOn: 1 }), config.formatTimestampEndOfDay);
  }
};

export const weekDateRangeAsString = (startDate, endDate) => {
  return `${format(startDate, config.formatDateTitleString)} - ${format(endDate, config.formatDateTitleString)}`;
};
