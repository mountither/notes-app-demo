import React from 'react';
import { FieldError } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { SCREEN_WIDTH } from '../../utils/dimensions';



type InputBoxProps = {
    error?: FieldError | undefined,
    label?: string,
    containerStyles?: ViewProps["style"]
} & TextInputProps
const InputBox = ({ label, error, containerStyles, ...props }: InputBoxProps) => {
    return (
        <View style={[{ position: "relative", width: SCREEN_WIDTH - 20, alignSelf: "center", }, containerStyles]}>
            {label ? <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "600", color: "#242424" }}>{label}</Text> : null}
            <View style={{ position: "relative" }}>
                <TextInput
                    autoCapitalize="none"
                    placeholderTextColor={"gray"}
                    style={{
                        backgroundColor: "#e2e2e2",
                        width: SCREEN_WIDTH - 20,
                        alignSelf: "center",
                        borderRadius: 10,
                        height: 50,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                    {...props}
                />
                {error ?
                    <Text style={{ fontSize: 12, marginTop: 5, color: "red", position: "absolute", bottom: -30 }}>{error.message}</Text>
                    : null
                }
            </View>

        </View>
    )
}

export default InputBox