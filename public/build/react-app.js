import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from "react";
import { createRoot } from "react-dom/client";
function PipelineDebugMetricsView({ state, definitions, }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "debug-metric", children: [_jsx("strong", { children: "Overall status:" }), " ", _jsx("span", { children: state.globalStatus })] }), _jsxs("div", { className: "debug-metric", children: [_jsx("strong", { children: "SR:" }), " ", _jsx("span", { children: state.sampleRate })] }), definitions.map((def) => {
                const pipelineState = state.pipelines[def.key] ?? {
                    frequencyText: "—",
                    statusText: "—",
                };
                return (_jsxs(Fragment, { children: [_jsxs("div", { className: "debug-metric", children: [_jsxs("strong", { children: [def.label, " Hz:"] }), " ", _jsx("span", { children: pipelineState.frequencyText })] }), _jsxs("div", { className: "debug-metric", children: [_jsxs("strong", { children: [def.label, " status:"] }), " ", _jsx("span", { children: pipelineState.statusText })] })] }, def.key));
            })] }));
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
        this.root.render(_jsx(PipelineDebugMetricsView, { state: this.state, definitions: this.definitions }));
    }
}
export function mountPipelineDebugMetrics(options) {
    return new PipelineDebugMetricsController(options);
}
