import {
  leaveApplications,
  leaveBalances,
} from "../db/db";

type CancelLeaveInput = {
  id: number;
};

export async function cancelLeave(
  data: CancelLeaveInput
) {
  const leave = leaveApplications.find(
    (item) => item.id === data.id
  );

  if (!leave) {
    return {
      success: false,

      message: "Leave not found",
    };
  }

  // restore leave balance

  const balance = leaveBalances.find(
    (item) =>
      item.type.toLowerCase() ===
      leave.leaveType.toLowerCase()
  );

  if (balance) {
    balance.available += 1;
  }

  // remove leave

  const index =
    leaveApplications.findIndex(
      (item) => item.id === data.id
    );

  leaveApplications.splice(index, 1);

  return {
    success: true,

    message:
      "Leave cancelled successfully",
  };
}