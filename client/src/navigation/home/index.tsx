import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CloseButton from '../../common/components/CloseButton';
import CreateNoteView from '../../screens/notes/CreateNoteView';
import EditNoteView from '../../screens/notes/EditNoteView';
import { createNoteModalConfig, editNoteModalConfig } from '../utils/modalConfig';
import AppTabs from './AppTabs';

const { Navigator, Screen, Group } = createStackNavigator();


export type ModalScreenProps = {
    EditNoteModal: {
        noteID: string | number
    }
}

const HomeNavigation = () => {

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Tabs"
        >
            <Screen name="Tabs" component={AppTabs} />
            <Group>
                <Screen
                    name="CreateNoteModal"
                    component={CreateNoteView}
                    options={({ navigation }) => ({
                        ...createNoteModalConfig,
                        headerRight: () => <CloseButton onPress={() => navigation.goBack()} />

                    })}
                />
                <Screen
                    name="EditNoteModal"
                    component={EditNoteView}
                    options={({ navigation }) => ({
                        ...editNoteModalConfig,
                        headerRight: () => <CloseButton onPress={() => navigation.goBack()} />
                    })}
                />
            </Group>
        </Navigator>
    )
}

export default HomeNavigation
