import LeaveForm from "@/components/LeaveForm";

import LeaveBalance from "@/components/LeaveBalance";

import LeaveTable from "@/components/LeaveTable";

async function getLeaveData() {
  const res = await fetch(
    "http://localhost:3000/api/leaves",
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