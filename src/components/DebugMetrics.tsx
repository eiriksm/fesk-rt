import React from "react";

export interface DebugMetricDefinition {
  key: string;
  label: string;
}

interface DebugMetricsProps {
  definitions: DebugMetricDefinition[];
}

export function DebugMetrics({ definitions }: DebugMetricsProps) {
  return (
    <>
      {definitions.map((def) => (
        <React.Fragment key={def.key}>
          <div className="debug-metric">
            <strong>{def.label} Hz:</strong>{" "}
            <span id={`freq-${def.key}`}>—</span>
          </div>
          <div className="debug-metric">
            <strong>{def.label} status:</strong>{" "}
            <span id={`status-${def.key}`}>—</span>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
