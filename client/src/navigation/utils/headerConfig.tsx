
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";

export const headerConfig = ({ title, props }: { title: string, props?: StackNavigationOptions | BottomTabNavigationOptions }): StackNavigationOptions | BottomTabNavigationOptions => {


    return {
        title,
        headerStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0.5,
            borderBottomColor: "#e2e2e2"
        },
        headerTintColor: '#242424',
        headerTitleStyle: {
            fontSize: 20
        },
        headerBackTitleVisible: false,
        ...props
    }
}