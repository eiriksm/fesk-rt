import { Fragment } from "react";
import { createRoot, Root } from "react-dom/client";

export interface PipelineDefinition {
  key: string;
  label: string;
}

interface PipelineMetricState {
  frequencyText: string;
  statusText: string;
}

interface MetricsState {
  globalStatus: string;
  sampleRate: string;
  pipelines: Record<string, PipelineMetricState>;
}

interface MountOptions {
  container: HTMLElement;
  pipelines: PipelineDefinition[];
  initialStatus?: string;
  initialSampleRate?: string;
}

function PipelineDebugMetricsView({
  state,
  definitions,
}: {
  state: MetricsState;
  definitions: PipelineDefinition[];
}) {
  return (
    <>
      <div className="debug-metric">
        <strong>Overall status:</strong> <span>{state.globalStatus}</span>
      </div>
      <div className="debug-metric">
        <strong>SR:</strong> <span>{state.sampleRate}</span>
      </div>
      {definitions.map((def) => {
        const pipelineState = state.pipelines[def.key] ?? {
          frequencyText: "—",
          statusText: "—",
        };
        return (
          <Fragment key={def.key}>
            <div className="debug-metric">
              <strong>{def.label} Hz:</strong>{" "}
              <span>{pipelineState.frequencyText}</span>
            </div>
            <div className="debug-metric">
              <strong>{def.label} status:</strong>{" "}
              <span>{pipelineState.statusText}</span>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

export class PipelineDebugMetricsController {
  private readonly root: Root;
  private readonly definitions: PipelineDefinition[];
  private state: MetricsState;

  constructor({
    container,
    pipelines,
    initialStatus = "",
    initialSampleRate = "",
  }: MountOptions) {
    this.definitions = pipelines;
    this.root = createRoot(container);
    this.state = {
      globalStatus: initialStatus,
      sampleRate: initialSampleRate,
      pipelines: Object.fromEntries(
        pipelines.map((pipeline) => [pipeline.key, {
          frequencyText: "—",
          statusText: "—",
        } satisfies PipelineMetricState]),
      ),
    };
    this.render();
  }

  setGlobalStatus(text: string) {
    this.state.globalStatus = text;
    this.render();
  }

  setSampleRate(text: string) {
    this.state.sampleRate = text;
    this.render();
  }

  setPipelineFrequency(key: string, text: string | null | undefined) {
    const entry = this.state.pipelines[key];
    if (!entry) return;
    entry.frequencyText = text && text.trim().length > 0 ? text : "—";
    this.render();
  }

  resetPipelineFrequencies() {
    for (const entry of Object.values(this.state.pipelines)) {
      entry.frequencyText = "—";
    }
    this.render();
  }

  setPipelineStatus(key: string, text: string | null | undefined) {
    const entry = this.state.pipelines[key];
    if (!entry) return;
    entry.statusText = text && text.trim().length > 0 ? text : "—";
    this.render();
  }

  resetPipelineStatuses() {
    for (const entry of Object.values(this.state.pipelines)) {
      entry.statusText = "—";
    }
    this.render();
  }

  private render() {
    this.root.render(
      <PipelineDebugMetricsView
        state={this.state}
        definitions={this.definitions}
      />,
    );
  }
}

export function mountPipelineDebugMetrics(options: MountOptions) {
  return new PipelineDebugMetricsController(options);
}
