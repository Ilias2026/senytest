import date from "../utils/date";

const countParser = (value) => {
    return value;
}

const timeParser = (value) => {
    return parseInt(value)
}

const timeSimplifier = (value) => {
    return date.readableSeconds(value);
}

const newPRSchema = {
    options: [
        {
            key: "pr-wip-time",
            name: "wip-time",
            tip: 'Work in Progress Time',
            type: "time"
        }, {
            key: "pr-wip-count",
            name: "wip-count",
            tip: 'Work in Progress Count',
        }, {
            key: "pr-review-time",
            name: "review-time",
            tip: "Review Time",
            type: "time"
        }, {
            key: "pr-review-count",
            name: "review-count",
            tip: "Review Count",
        }, {
            key: "pr-merging-time",
            name: "merging-time",
            tip: "Merge Time",
            type: "time"
        }, {
            key: "pr-merging-count",
            name: "merging-count",
            tip: "Merge Count",
        }, {
            key: "pr-release-time",
            name: "release-time",
            type: "time",
            tip: "Release Time",
        }, {
            key: "pr-release-count",
            name: "release-count",
            tip: "Release Count",
        }, {
            key: "pr-lead-time",
            name: "lead-time",
            type: "time",
            tip: "Lead Time",
        }, {
            key: "pr-lead-count",
            name: "lead-count",
            tip: "Lead Count",
        }, {
            key: "pr-cycle-time",
            name: "cycle-time",
            type: "time",
            tip: "Cycle Time",
        }, {
            key: "pr-cycle-count",
            name: "cycle-count",
            tip: "Cycle Count",
        }, {
            key: "pr-opened",
            name: "opened",
            tip: "Opened pull requests"
        }, {
            key: "pr-reviewed",
            name: "reviewed",
            tip: "Reviewed pull requests"
        }, {
            key: "pr-not-reviewed",
            name: "not-reviewed",
            tip: "Need to be Reviewed"
        }, {
            key: "pr-merged",
            name: "merged",
            tip: "Merged pull requests"
        }, {
            key: "pr-rejected",
            name: "rejected",
            tip: "Rejected pull requests"
        }, {
            key: "pr-closed",
            name: "closed",
            tip: "CLosed pull requests"
        }, {
            key: "pr-done",
            name: "done",
            tip: "Opened, Reviewed and Merged"
        }
    ], 
    parsers: {
        count: countParser,
        time: timeParser
    },
    simplifiers: {
        time: timeSimplifier,
    }
}

export default newPRSchema;