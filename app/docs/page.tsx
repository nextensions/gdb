"use client";
import { parseDate } from "@internationalized/date";
import { Calendar } from "@nextui-org/react";

import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <div className="flex gap-x-4">
        <Calendar aria-label="Date (No Selection)" />
        <Calendar
          aria-label="Date (Uncontrolled)"
          defaultValue={parseDate("2020-02-03")}
        />
      </div>
    </div>
  );
}
