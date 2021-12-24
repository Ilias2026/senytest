import newPRSchema from "./newPRSchema";

//find and return info for a specific metric
export default function getPRInfo(key) {
    return newPRSchema.options.find(obj => obj.key === key)
}