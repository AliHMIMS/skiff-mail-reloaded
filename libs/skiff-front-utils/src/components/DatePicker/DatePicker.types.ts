import { Dayjs } from 'dayjs';
import { AccentColor, ThemeMode } from 'nightwatch-ui';

/** Called with the picked date (null when cleared). */
export type DateSelectHandler = (date: Date | null) => void;

export type DatePickerEvent = { date: Dayjs; events: { color: AccentColor }[] };

export interface DatePickerProps {
  onSelectDate: DateSelectHandler;
  bgColor?: string;
  className?: string;
  datePickerEvents?: DatePickerEvent[];
  forceTheme?: ThemeMode;
  highlightCurrentWeek?: boolean;
  minDate?: Date;
  selectedDate?: Dayjs;
  showHeader?: boolean;
}
