/**
 * we define global css styles
 */

const inputContainer = `
    .inputContainer {
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 10px 5px;
        font-size: 1.1em;
    }
`
const input = `
    .input {
        outline: none;
        padding: 5px;
    }
`
const constaintsStyles = {
    inputContainer,
    input,
    lightShadow: `box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, .3);`,
    white: "#ffffff",
    colorOrange1: `#ff7427`,
    colorOrange2: `#ffe4d5`,
    red1: 'rgba(255, 0, 0, .6)',
    red2: '#EA3C53',
    blue1: '#138bc3',
}

export default constaintsStyles;