import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LeaveBalanceRecord } from "@/lib/db/db";

type Props = {
  balances: LeaveBalanceRecord[];
};

export default function LeaveBalance({
  balances,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Leave Balance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {balances.map((balance) => (
          <div
            key={balance.type}
            className="flex justify-between"
          >
            <span>{balance.type}</span>

            <span>
              {balance.available}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}