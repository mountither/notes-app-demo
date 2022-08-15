import * as yup from "yup";


export const usernameValidation = yup
    .string()
    .required("Please enter your username");