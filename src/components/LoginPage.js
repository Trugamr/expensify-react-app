import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h3>Login Page</h3>
                <button onClick={this.props.startLogin}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)