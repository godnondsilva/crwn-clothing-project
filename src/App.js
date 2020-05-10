import React from 'react';

// CSS Imports
import './App.css';

// React-Router-DOM
import { Route, Switch, Redirect } from 'react-router-dom';

// Components 
import Header from './components/header/header.component';

// Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// Auth
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {

        // The point of this section is that
        // after we save the user in "SIGN UP" to the database
        // we need to access that database and login and load the user. that's why we need this

        const userRef = await createUserProfileDocument(userAuth);
  
        // Whenever there is change in the auth, this will run!
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      // else { 
      setCurrentUser(userAuth);
      // }
    });
  }

  componentWillUnmount() {
    // has to be unsubscribed otherwise will cause issues
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user =>  dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


