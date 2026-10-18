import { Joyride, type EventData, type Props } from 'react-joyride';

import { QuickAliasJoyrideTooltip } from './QuickAliasJoyrideTooltip';
import { customJoyrideTooltipStyle } from './QuickAliasMailbox.constants';
import { IdentifiedJoyrideStep } from './QuickAliasMailbox.types';

interface QuickAliasJoyrideProps extends Omit<Props, 'steps'> {
  steps: IdentifiedJoyrideStep[];
  run: boolean;
  callback: (data: EventData) => void;
}

/**
 * Wrapper component for Quick Alias joyride to enforce typing on steps and apply custom styles.
 */

export const QuickAliasJoyride: React.FC<QuickAliasJoyrideProps> = ({ callback, ...props }: QuickAliasJoyrideProps) => {
  return (
    <Joyride
      {...props}
      continuous
      onEvent={callback}
      // don't scroll the page to the target; the tour points at visible toolbar items
      options={{ ...customJoyrideTooltipStyle, skipScroll: true }}
      tooltipComponent={QuickAliasJoyrideTooltip}
    />
  );
};
