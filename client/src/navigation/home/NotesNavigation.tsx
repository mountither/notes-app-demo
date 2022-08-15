import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NotesView from '../../screens/notes/NotesView';
import { headerConfig } from '../utils/headerConfig';


const { Screen, Navigator } = createStackNavigator();


const NotesNavigation = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    return (
        <Navigator>

            <Screen
                name="NotesView"
                options={headerConfig({
                    title: "My Notes",
                    props: {
                        headerRight: () => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate("CreateNoteModal")}
                                style={{ marginRight: 10 }}
                            >
                                <AntDesign name="addfile" size={20} />
                            </TouchableOpacity>

                        )
                    }

                }) as StackNavigationOptions}
                component={NotesView}
            />
        </Navigator>
    )
}

export default NotesNavigation
