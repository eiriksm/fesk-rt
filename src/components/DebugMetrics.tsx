import React from "react";

export interface DebugMetricDefinition {
  key: string;
  label: string;
}

interface DebugMetricsProps {
  definitions: DebugMetricDefinition[];
  frequencies: Record<string, string>;
  statuses: Record<string, string>;
}

export function DebugMetrics({
  definitions,
  frequencies,
  statuses,
}: DebugMetricsProps) {
  return (
    <>
      {definitions.map((def) => (
        <React.Fragment key={def.key}>
          <div className="debug-metric">
            <strong>{def.label} Hz:</strong>{" "}
            <span>{frequencies[def.key] ?? "—"}</span>
          </div>
          <div className="debug-metric">
            <strong>{def.label} status:</strong>{" "}
            <span>{statuses[def.key] ?? "—"}</span>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
