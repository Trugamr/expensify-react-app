// Higher order component
// component that renders other component

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: { props.info }</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return(props) => (
        <div>
            <p>This is private info. Please don't share!</p>
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return(props) => (
        <div>
            {props.authenticated ? <WrappedComponent {... props} /> : 'Please login'}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info)

const AdminInfo = withAdminWarning(Info) 

ReactDOM.render(<AuthInfo authenticated={true} info={"queres ?"}/>, document.querySelector('#app'))