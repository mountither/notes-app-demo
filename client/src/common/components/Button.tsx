import React from 'react'
import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity } from 'react-native'

type ButtonProps = {
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    title: string,
    isLoading?: boolean,
}

const Button = ({ title, onPress, isLoading }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={{ backgroundColor: "black", width: 200, alignSelf: "center", paddingHorizontal: 5, paddingVertical: 15, borderRadius: 10, alignItems: "center" }}
            onPress={onPress}
        >
            {
                isLoading ?
                    <ActivityIndicator color={"white"} />
                    :
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button