import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AccountView from '../../screens/account';
import { headerConfig } from '../utils/headerConfig';
import NotesNavigation from './NotesNavigation';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {

    return (
        <Tabs.Navigator
            initialRouteName={"Notes"}
            backBehavior="none"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Notes') {
                        iconName = "book"
                    } else if (route.name === 'AccountView') {
                        iconName = 'user';
                    }
                    return <Entypo name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6dacad',
                tabBarInactiveTintColor: '#919191',
            })}
        >
            <Tabs.Screen
                name="Notes"
                options={{ headerShown: false }}
                component={NotesNavigation}
            />
            <Tabs.Screen
                name="AccountView"
                options={headerConfig({ title: "My Account" }) as BottomTabNavigationOptions}
                component={AccountView}
            />
        </Tabs.Navigator>
    )
}

export default AppTabs
