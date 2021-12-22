function generateRandomDarkColor() {
    const letters = '0123456789ABCDEF';
    const firstOffset = 1
    let color = '#'
    for (let i = 0; i < firstOffset; i++) {
        color += letters.substring(0, 5)[Math.floor(Math.random() * 5)]; //secret for getting dark colors is randomize first char between 1..5 only
    }
    for (let i = firstOffset; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const colors = [
    '#87C38F',
    '#B5E2FA',
    '#F7A072',
    '#98C1D9',
    '#64A6BD',
    '#D7B9D5',
    '#FFBC42',
    '#8B85C1',
    '#DCDBA8'
]

/**
 * 
 * @param {number} size 
 */
function getRandomColors(size) {
    return colors.sort((a, b) => Math.random() - Math.random()).slice(0, size)
}

const color = {
    generateRandomDarkColor,
    getRandomColors,
}

export default color;