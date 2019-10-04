import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try { 
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (err) {
            console.log('At signin, caught error:' + err)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an Account</h2>
                <span>Sign In with your email account</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        label='email'
                        required />
                    <FormInput
                        name='password' 
                        type='password'
                        handleChange={this.handleChange}
                        value={this.state.password}
                        label='password'
                        required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignIn;