import { state } from "../main.js"

const resultPage = () => {
    const result = state.get('result')
    const username = state.get('username')

    return [
        {
            tag: 'div',
            attrs: {
                class: 'result-container'
            },
            children: [
                {
                    tag: 'div',
                    attrs: {
                        class: 'message',
                    },
                    children: [{
                        tag: 'h3',

                        text: `${result == "win" ? "Congrats" : "Next game"} ${username} you ${result} ${result == "win" ? "..." : "this Time."}`
                    },
                    {
                        tag: 'div',
                        attrs: {
                            class: `img-${result == "win" ? "celebrating" : "lose"}`
                        }
                    }]
                },
                {
                    tag: "div",
                    attrs: {
                        class: "home-btn"
                    },
                    children: [
                        {
                            tag: "button",
                            text: "home",
                            attrs: {
                                onclick: () => {
                                    location.href = "/"
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

export default resultPage