import React, { ReactNode } from 'react'
import { StyleProp, View, ViewProps } from 'react-native'


type ScreenContainerProps = {
    children: ReactNode,
    styles?: ViewProps["style"],
}
const ScreenContainer = ({ children, styles }: ScreenContainerProps) => {
    return (
        <View style={[{ paddingVertical: 20, paddingHorizontal: 15, alignItems: "center" }, styles]}>
            {children}
        </View>
    )
}

export default ScreenContainer