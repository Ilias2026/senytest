export default function refreshTabs(tabs) {
    localStorage.setItem("tabs", JSON.stringify(tabs))
}