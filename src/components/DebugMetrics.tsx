import React, { useEffect } from "react";

export interface DebugMetricDefinition {
  key: string;
  label: string;
}

interface DebugMetricsProps {
  definitions: DebugMetricDefinition[];
  onReady?: () => void;
}

export function DebugMetrics({ definitions, onReady }: DebugMetricsProps) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

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
