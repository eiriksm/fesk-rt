const { Fragment } = React;
const { createRoot } = ReactDOM;
function PipelineDebugMetricsView({ state, definitions, }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "debug-metric" },
            React.createElement("strong", null, "Overall status:"),
            " ",
            React.createElement("span", null, state.globalStatus)),
        React.createElement("div", { className: "debug-metric" },
            React.createElement("strong", null, "SR:"),
            " ",
            React.createElement("span", null, state.sampleRate)),
        definitions.map((def) => {
            const pipelineState = state.pipelines[def.key] ?? {
                frequencyText: "—",
                statusText: "—",
            };
            return (React.createElement(Fragment, { key: def.key },
                React.createElement("div", { className: "debug-metric" },
                    React.createElement("strong", null,
                        def.label,
                        " Hz:"),
                    " ",
                    React.createElement("span", null, pipelineState.frequencyText)),
                React.createElement("div", { className: "debug-metric" },
                    React.createElement("strong", null,
                        def.label,
                        " status:"),
                    " ",
                    React.createElement("span", null, pipelineState.statusText))));
        })));
}
export class PipelineDebugMetricsController {
    constructor({ container, pipelines, initialStatus = "", initialSampleRate = "", }) {
        this.definitions = pipelines;
        this.root = createRoot(container);
        this.state = {
            globalStatus: initialStatus,
            sampleRate: initialSampleRate,
            pipelines: Object.fromEntries(pipelines.map((pipeline) => [pipeline.key, {
                    frequencyText: "—",
                    statusText: "—",
                }])),
        };
        this.render();
    }
    setGlobalStatus(text) {
        this.state.globalStatus = text;
        this.render();
    }
    setSampleRate(text) {
        this.state.sampleRate = text;
        this.render();
    }
    setPipelineFrequency(key, text) {
        const entry = this.state.pipelines[key];
        if (!entry)
            return;
        entry.frequencyText = text && text.trim().length > 0 ? text : "—";
        this.render();
    }
    resetPipelineFrequencies() {
        for (const entry of Object.values(this.state.pipelines)) {
            entry.frequencyText = "—";
        }
        this.render();
    }
    setPipelineStatus(key, text) {
        const entry = this.state.pipelines[key];
        if (!entry)
            return;
        entry.statusText = text && text.trim().length > 0 ? text : "—";
        this.render();
    }
    resetPipelineStatuses() {
        for (const entry of Object.values(this.state.pipelines)) {
            entry.statusText = "—";
        }
        this.render();
    }
    render() {
        this.root.render(React.createElement(PipelineDebugMetricsView, { state: this.state, definitions: this.definitions }));
    }
}
export function mountPipelineDebugMetrics(options) {
    return new PipelineDebugMetricsController(options);
}
