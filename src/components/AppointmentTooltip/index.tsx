import React from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { ScheduleClassUpdateType } from "../../typings/enum";

const AppointmentTooltipLayout: React.FC<AppointmentTooltip.LayoutProps> = (
  props
) => {
  const { appointmentMeta } = props;

  return (
    <AppointmentTooltip.Layout
      {...props}
      showOpenButton={
        appointmentMeta?.data.type !== ScheduleClassUpdateType.SWAP
      }
    />
  );
};

export default AppointmentTooltipLayout;
