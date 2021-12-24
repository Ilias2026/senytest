import readTabs from "./readTabs";

/**
 * adds a new tab to localstorage
 * @param {Object} tab 
 * @param {string} tab._id
 * @param {string[]} tab.metrics
 */
export default function addTab(tab) {
    const data = readTabs();
    data.push(tab)
    localStorage.setItem("tabs", JSON.stringify(data))
}