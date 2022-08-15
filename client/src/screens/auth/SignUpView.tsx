import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { registerUser } from '../../common/api/auth';
import Button from '../../common/components/Button';
import InputBox from '../../common/components/form/InputBox';
import { SCREEN_WIDTH } from '../../common/utils/dimensions';
import { usernameValidation } from '../../modules/auth/utils/formValidators';
import { setUser } from '../../redux/slices/UserAuthSlice';

type SigUpFormValues = {
    username: string;
    password: string;
    cpassword: string
};

export const signUpSchema = yup.object().shape({
    username: usernameValidation,
    password: yup
        .string()
        .required("Please enter a password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    cpassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match"),

});

const SignUpView = () => {


    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: "",
            cpassword: ""
        },
        resolver: yupResolver(signUpSchema),
    });

    const [responseError, setResponseError] = useState<string | undefined>(undefined)

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)

    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<SigUpFormValues> = async (data) => {
        try {
            setIsSigningUp(true)
            setResponseError(undefined)

            const { token } = await registerUser({ username: data.username, password: data.password });

            dispatch(setUser({ username: data.username, token }))

            setIsSigningUp(false)
        } catch (error) {
            console.log(error)
            setResponseError("Failed to sign up.")
            setIsSigningUp(false)
        }
    }


    return (
        <>
            <ScrollView
                contentContainerStyle={{ paddingVertical:30}}
            >
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputBox
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="Enter a unique username"
                            returnKeyType="next"
                            label={"Username"}
                            blurOnSubmit={false}
                            value={value}
                            error={errors.username}
                        />
                    )}
                    name="username"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputBox
                            onBlur={onBlur}
                            containerStyles={{ marginTop: 50 }}
                            onChangeText={onChange}
                            placeholder="••••••••"
                            label='Password'
                            value={value}
                            secureTextEntry={true}
                            error={errors.password}
                        />
                    )}
                    name="password"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputBox
                            onBlur={onBlur}
                            containerStyles={{ marginTop: 50 }}
                            onChangeText={onChange}
                            placeholder="••••••••"
                            label='Confirm Password'
                            value={value}
                            secureTextEntry={true}
                            error={errors.cpassword}
                        />
                    )}
                    name="cpassword"
                />


            </ScrollView>


            <KeyboardAvoidingView
                behavior="position"
                style={{ alignSelf: "center", }}
                keyboardVerticalOffset={50}

            >
                <View style={{ backgroundColor: "transparent", width: SCREEN_WIDTH, height: 100, paddingVertical: 20 }}>
                    {
                        !!responseError ?
                            <Text style={{ alignSelf: "center", color: "red", marginBottom: 20 }}>{responseError}</Text>
                            :
                            null
                    }
                    <Button title='Sign Up' onPress={handleSubmit(onSubmit)} isLoading={isSigningUp} />
                </View>

            </KeyboardAvoidingView>
        </>

    )
}

export default SignUpView