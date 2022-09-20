import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';

const Navbar = (props) => {

    const { auth, profile, signOut } = props;

    const hamBefore = `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`;
    const hamBeforeActive = `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`;
    const hamAfter = `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`;
    const hamAfterActive = `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`;

    const [isMenuOpen, setMenuOpen] = useState(false);

    const getHamburgerStyle = () => {
        return (
            <>
                <style>
                    {`
                        .hamburgerInner{
                            transition-delay: ${isMenuOpen ? '0.12s' : '0s'};
                            transform: rotate(${isMenuOpen ? '225deg' : '0deg'})!important;
                            transition-timing-function: cubic-bezier(${isMenuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'
                        });
                        }
                        .hamburgerInner::before{
                            width:${isMenuOpen ? '100%' : '80%'};
                            top:${isMenuOpen ? '0' : '-10px'};
                            opacity:${isMenuOpen ? '0' : '1'};
                            transition:${isMenuOpen ? hamBeforeActive : hamBefore};
                        }
                        .hamburgerInner::after{
                            width:${isMenuOpen ? '100%' : '120%'};
                            bottom:${isMenuOpen ? '0' : '-10px'};
                            transform:rotate(${isMenuOpen ? '-90deg' : '0'});
                            transition:${isMenuOpen ? hamAfterActive : hamAfter};
                        }
                `}
                </style>
            </>
        );
    };

    const SignedInLinks = () => {
        return (
            <>
                <li>
                    <NavLink to='/create'>
                        New Blog
                    </NavLink>
                </li>
                <li>
                    <a onClick={signOut}>
                        Log Out
                    </a>
                </li>
                {profile && profile.avatar &&
                    <li className='mobHide'>
                        <NavLink to='/' className="btn btn-floating pink lighten-1">
                            {profile.avatar}
                        </NavLink>
                    </li>
                }
            </>
        );
    };

    const SignedOutLinks = () => {
        return (
            <>
                <li>
                    <NavLink to='/signup'>
                        Signup
                    </NavLink></li>
                <li>
                    <NavLink to='/signin'>
                        Login
                    </NavLink>
                </li>
            </>
        );
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const getMenuStyle = isMenuOpen => {
        return {
            transform: `translateX(${isMenuOpen ? '0' : '100'}vw)`,
            visibility: `${isMenuOpen ? 'visible' : 'hidden'}`,
        };
    };

    return (
        <div className="navbar-fixed">
            <nav className="nav-wrapper">
                <div className="container">
                    <div
                        role="button"
                        className="hamburger"
                        aria-label="Menu"
                        onClick={() => toggleMenu()}
                    >
                        {getHamburgerStyle()}
                        <div className="hamburgerBox">
                            <div className="hamburgerInner"></div>
                        </div>
                    </div>
                    <Link to='/' className="brand-logo">
                        Sample Blog
                    </Link>
                    <ul className="right hide-on-med-and-down ">
                        {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
                    </ul>
                </div>
            </nav>
            {isMenuOpen && (
                <div
                    className="menu"
                    onClick={() => toggleMenu()}
                    style={getMenuStyle(isMenuOpen)}
                >
                    <aside className="aside">
                        <div
                            role="button"
                            className="hamburger"
                            aria-label="Menu"
                            onClick={() => toggleMenu()}
                        >
                            {getHamburgerStyle()}
                            <div className="hamburgerBox">
                                <div className="hamburgerInner"></div>
                            </div>
                        </div>
                        <div className="nav">
                            <ul>
                                {auth.uid ? <SignedInLinks /> : <SignedOutLinks />}
                            </ul>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
