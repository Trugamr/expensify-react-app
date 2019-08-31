import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth';

export const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <img className="header__icon" src="/images/icon.png"></img><h1>Expensify</h1>
                </Link>
                <button className="button green" onClick={props.startLogout}>
                    Logout &nbsp;<i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);