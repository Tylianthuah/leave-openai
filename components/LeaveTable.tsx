import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LeaveApplication } from "@/lib/db/db";

type Props = {
  leaves: LeaveApplication[];
};

export default function LeaveTable({
  leaves,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Applied Leaves
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="rounded-lg border p-4"
            >
              <div className="font-medium">
                {leave.leaveType}
              </div>

              <div className="text-sm text-muted-foreground">
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
                {" → "}
                {new Date(
                  leave.toDate
                ).toLocaleDateString()}
              </div>

              <div className="mt-2 text-sm">
                Status: {leave.status}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}