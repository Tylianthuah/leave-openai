"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

export default function LeaveForm() {
  const router = useRouter();
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");

  async function handleSubmit() {
    const res = await fetch(
      "http://localhost:3000/api/leaves",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          leaveType,
          fromDate,
          toDate,
          reason,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    router.refresh();
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Apply Leave</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Leave Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Leave Type
          </label>

          <Select onValueChange={setLeaveType}>
            <SelectTrigger>
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Sick Leave">
                Sick Leave
              </SelectItem>

              <SelectItem value="Casual Leave">
                Casual Leave
              </SelectItem>

              <SelectItem value="Vacation Leave">
                Vacation Leave
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* From Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            From Date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {fromDate
                  ? format(fromDate, "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            To Date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {toDate
                  ? format(toDate, "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Reason
          </label>

          <Input
            placeholder="Enter reason"
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
        >
          Apply Leave
        </Button>
      </CardContent>
    </Card>
  );
}