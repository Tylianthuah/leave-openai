export type LeaveBalanceRecord = {
  type: string;

  available: number;
};

export type LeaveApplication = {
  id: number;

  fromDate: Date;

  toDate: Date;

  leaveType: string;

  reason: string;

  status: "Pending" | "Approved" | "Rejected";
};

export const leaveApplications: LeaveApplication[] = [
  {
    id: 1,

    fromDate: new Date("2024-07-01"),

    toDate: new Date("2024-07-05"),

    leaveType: "Vacation Leave",

    reason: "Family trip",

    status: "Approved",
  },
];

export const leaveBalances: LeaveBalanceRecord[] = [
  {
    type: "Casual Leave",

    available: 8,
  },

  {
    type: "Sick Leave",

    available: 5,
  },

  {
    type: "Vacation Leave",

    available: 12,
  },
];