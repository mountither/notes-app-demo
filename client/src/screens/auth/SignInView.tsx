import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TextComponent, TouchableOpacity, View } from 'react-native'
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { usernameValidation } from '../../modules/auth/utils/formValidators';
import { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from "react-hook-form";
import ScreenContainer from '../../common/layout/ScreenContainer';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../common/utils/dimensions';
import InputBox from '../../common/components/form/InputBox';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signInUser } from '../../common/api/auth';
import Button from '../../common/components/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/UserAuthSlice';

type SigInFormValues = {
  username: string;
  password: string;
};

export const signInSchema = yup.object().shape({
  username: usernameValidation,
  password: yup.string().required("Please enter your password"),
});

const SignInView = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(signInSchema),
  });


  const [responseError, setResponseError] = useState<string | undefined>(undefined)
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false)

  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<SigInFormValues> = async (data) => {
    try {
      setIsSigningIn(true)
      setResponseError(undefined)

      const { token } = await signInUser({ username: data.username, password: data.password });

      dispatch(setUser({ username: data.username, token }))

      setIsSigningIn(false)
    } catch (error) {
      console.log(error)
      setResponseError("Failed to sign in.")
      setIsSigningIn(false)
    }
  }

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <ScrollView
      style={{ padding: 20 }}

    >
      <TouchableOpacity style={{ alignSelf: "flex-start" }}
        onPress={() => navigation.navigate("SignUpView")}
      >
        <Text style={{ textDecorationLine: "underline", fontWeight: "bold", fontSize: 15 }}>Sign Up</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView style={{ marginTop: 70 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputBox
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter your username"
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
        <View style={{ marginTop: 80 }}>
          {
            !!responseError ?
              <Text style={{ alignSelf: "center", color: "red", marginBottom: 20 }}>{responseError}</Text>
              :
              null
          }
          <Button title='Sign In' onPress={handleSubmit(onSubmit)} isLoading={isSigningIn} />
        </View>

      </KeyboardAvoidingView>

    </ScrollView>
  )
}

export default SignInView