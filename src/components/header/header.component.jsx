import React from 'react';

import { connect } from 'react-redux';

import './header.styles.scss';

import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';

//Selectors
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
 
const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {
            hidden ? 
            null
            :
            <CartDropdown />
        }
    </div>
);

const mapStateToProps = createStructuredSelector({  // (state) param
    currentUser: selectCurrentUser, // currentUser: state.user.currentUser,
    hidden: selectCartHidden // hidden: state.cart.hidden
})

export default connect(mapStateToProps)(Header);