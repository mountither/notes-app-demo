import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getUserData, UserAuthState } from '../redux/slices/UserAuthSlice';
import AuthNavigation from './auth';
import HomeNavigation from './home';

axios.defaults.baseURL = 'http://192.168.0.2:8000/api';
axios.defaults.timeout = 3000;

const RootNavigation = () => {

    const state = useSelector((state: UserAuthState) => state)
    const userSession = getUserData(state)



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} />
            <NavigationContainer>
                {
                    !!userSession ?
                        <HomeNavigation />
                        :
                        <AuthNavigation />
                }


            </NavigationContainer>
        </GestureHandlerRootView>

    );
};

export default RootNavigation;
