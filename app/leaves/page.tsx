import LeaveForm from "@/components/LeaveForm";

import LeaveBalance from "@/components/LeaveBalance";

import LeaveTable from "@/components/LeaveTable";

async function getLeaveData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  const res = await fetch(
    new URL("/api/leaves", baseUrl).toString(),
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function LeavePage() {
  const data =
    await getLeaveData();

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Leave Portal
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <LeaveForm />

        <LeaveBalance
          balances={
            data.leaveBalances
          }
        />
      </div>

      <LeaveTable
        leaves={
          data.leaveApplications
        }
      />
    </main>
  );
}