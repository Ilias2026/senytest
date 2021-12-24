//synchronize the localstorage with state changes
export default function refreshTabs(tabs) {
    localStorage.setItem("tabs", JSON.stringify(tabs))
}