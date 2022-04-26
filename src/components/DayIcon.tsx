import { PropsWithoutRef } from 'react';
import { Day } from '../../types/data';

interface DayIconProps {
  day: Day;
}

type DayColorMap = {
  [key in Day]: string;
};

const DAY_COLOR_MAP: DayColorMap = {
  monday: 'bg-yellow-500',
  tuesday: 'bg-pink-400',
  wednesday: 'bg-green-500',
  thursday: 'bg-orange-500',
  friday: 'bg-blue-600',
  saturday: 'bg-purple-500',
  sunday: 'bg-red-500',
};

function DayIcon({ day }: PropsWithoutRef<DayIconProps>) {
  return <div className={`min-h-[1.25rem] min-w-[1.25rem] rounded-full ${DAY_COLOR_MAP[day]}`} data-tip={day} />;
}

export default DayIcon;
