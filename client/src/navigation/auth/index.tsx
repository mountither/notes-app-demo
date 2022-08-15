import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import SignInView from '../../screens/auth/SignInView';
import SignUpView from '../../screens/auth/SignUpView';
import { Text, View } from 'react-native';
import { headerConfig } from '../utils/headerConfig';


const { Screen, Navigator } = createStackNavigator();


const AuthNavigation = () => {

    return (
        <Navigator>
            <Screen
                name="SignInView"
                options={headerConfig({ title: "Sign In" }) as StackNavigationOptions}
                component={SignInView}
            />
            <Screen
                name="SignUpView"
                options={headerConfig({ title: "Sign Up" }) as StackNavigationOptions}
                component={SignUpView}
            />
        </Navigator>
    )
}

export default AuthNavigation
