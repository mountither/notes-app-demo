
import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';

export const commonModalConfig: StackNavigationOptions = {
    presentation: 'modal',
    headerShown: true,
    gestureEnabled: true,
    gestureVelocityImpact: 0.005,
    cardOverlayEnabled: true,
    cardStyle: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    ...TransitionPresets.ModalPresentationIOS,
}


export const createNoteModalConfig: StackNavigationOptions = {
    ...commonModalConfig,
    headerBackTitleVisible: false,
    headerLeft: () => null,
    title: "Create Note",
    headerTitleStyle: {
        fontSize: 20
    }
}

export const editNoteModalConfig: StackNavigationOptions = {
    ...commonModalConfig,
    headerBackTitleVisible: false,
    headerLeft: () => null,
    title: "Edit Note",
    headerTitleStyle: {
        fontSize: 20
    }
}