import React from 'react'

export default class Loader extends React.Component {
    componentDidMount() {
        const loaderContainer = document.querySelector('.loader-container')
        lottie
            .loadAnimation({
                container: loaderContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '/lottie-files/loader.json',
                rendererSettings: {
                    className: 'loader'
                }
            })
    }
    render() {
        return (
            <div className="loader-container">
            </div>
        )
    }
}