import newPRSchema from "./newPRSchema";

export default function getPRInfo(key) {
    return newPRSchema.options.find(obj => obj.key === key)
}