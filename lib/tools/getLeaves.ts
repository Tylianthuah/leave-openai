import {
  leaveApplications,
  leaveBalances,
} from "../db/db";

export async function getLeaves() {
  return {
    success: true,

    leaveApplications,

    leaveBalances,
  };
}