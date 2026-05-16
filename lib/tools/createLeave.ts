import {
  leaveApplications,
  leaveBalances,
} from "../db/db";

type CreateLeaveInput = {
  fromDate: string;

  toDate: string;

  leaveType: string;

  reason: string;
};

export async function createLeave(
  data: CreateLeaveInput
) {
  const leaveBalance = leaveBalances.find(
    (leave) =>
      leave.type.toLowerCase() ===
      data.leaveType.toLowerCase()
  );

  if (!leaveBalance) {
    return {
      success: false,

      message: "Invalid leave type",
    };
  }

  if (leaveBalance.available <= 0) {
    return {
      success: false,

      message:
        "No leave balance available",
    };
  }

  leaveBalance.available -= 1;

  const newLeave = {
    id: Date.now(),

    fromDate: new Date(data.fromDate),

    toDate: new Date(data.toDate),

    leaveType: data.leaveType,

    reason: data.reason,

    status: "Pending" as const,
  };

  leaveApplications.push(newLeave);

  return {
    success: true,

    message:
      "Leave applied successfully",

    leave: newLeave,

    balance: leaveBalance,
  };
}