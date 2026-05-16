import {
  leaveBalances,
} from "../db/db";

interface GetLeaveBalanceParams {
  leaveType?: string;
}

export async function getLeaveBalance(params?: GetLeaveBalanceParams) {
  if (params?.leaveType) {
    // Get specific leave type balance
    const balance = leaveBalances.find(
      (b) => b.type.toLowerCase() === params.leaveType?.toLowerCase()
    );

    if (!balance) {
      return {
        success: false,
        message: `Leave type "${params.leaveType}" not found`,
      };
    }

    return {
      success: true,
      leaveType: balance.type,
      available: balance.available,
    };
  }

  // Get all leave balances
  return {
    success: true,
    balances: leaveBalances,
    totalAvailable: leaveBalances.reduce(
      (sum, b) => sum + b.available,
      0
    ),
  };
}
