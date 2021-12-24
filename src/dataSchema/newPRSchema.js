import date from "../utils/date";

const countParser = (value) => {
    return value;
}

//we parse time with parseInt
const timeParser = (value) => {
    return parseInt(value)
}

//we simplify time with a function readableSeconds
const timeSimplifier = (value) => {
    return date.readableSeconds(value);
}

//schema for all Pull Requests metrics

const newPRSchema = {
    options: [
        {
            key: "pr-wip-count",
            name: "WIP",
            tip: 'Work in Progress Count',
        }, {
            key: "pr-wip-time",
            name: "WIP TIME",
            tip: 'Work in Progress Time',
            type: "time"
        }, {
            key: "pr-review-count",
            name: "REVIEW",
            tip: "Review Count",
        }, {
            key: "pr-review-time",
            name: "REVIEW TIME",
            tip: "Review Time",
            type: "time"
        }, {
            key: "pr-merging-count",
            name: "MERGE",
            tip: "Merge Count",
        }, {
            key: "pr-merging-time",
            name: "MERGE TIME",
            tip: "Merge Time",
            type: "time"
        }, {
            key: "pr-release-count",
            name: "RELEASE",
            tip: "Release Count",
        }, {
            key: "pr-release-time",
            name: "RELEASE TIME",
            type: "time",
            tip: "Release Time",
        }, {
            key: "pr-lead-count",
            name: "LEAD",
            tip: "Lead Count",
        }, {
            key: "pr-lead-time",
            name: "LEAD TIME",
            type: "time",
            tip: "Lead Time",
        }, {
            key: "pr-cycle-count",
            name: "CYCLE",
            tip: "Cycle Count",
        }, {
            key: "pr-cycle-time",
            name: "CYCLE TIME",
            type: "time",
            tip: "Cycle Time",
        }, {
            key: "pr-opened",
            name: "OPENED",
            tip: "Opened pull requests"
        }, {
            key: "pr-reviewed",
            name: "REVIEWED",
            tip: "Reviewed pull requests"
        }, {
            key: "pr-not-reviewed",
            name: "NOT REVIEWED",
            tip: "Need to be Reviewed"
        }, {
            key: "pr-merged",
            name: "MERGED",
            tip: "Merged pull requests"
        }, {
            key: "pr-rejected",
            name: "REJECTED",
            tip: "Rejected pull requests"
        }, {
            key: "pr-closed",
            name: "CLOSED",
            tip: "CLosed pull requests"
        }, {
            key: "pr-done",
            name: "DONE",
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