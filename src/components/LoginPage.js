import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1>Expensify</h1>
                    <p>managing expenses made easy</p>
                    <div className="box-layout__box__btn" onClick={this.props.startLogin}>
                        <i className="fab fa-google"></i>
                        <p>Login</p>
                    </div>
                </div>        
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)