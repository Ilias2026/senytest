export default function readTabs() {
    const raw = localStorage.getItem("tabs")
    if (!raw) return []
    try {
        return JSON.parse(raw)
    } catch (error) {
        return []
    }
}