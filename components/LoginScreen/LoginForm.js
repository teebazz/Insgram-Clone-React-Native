import React,{useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity,Alert } from 'react-native'
import * as Yup from 'yup'
import {Formik}  from 'formik'
import Validator from 'email-validator'
import {auth} from '../../firebase';
import {signInWithEmailAndPassword} from "firebase/auth"


const LoginForm = ({navigation}) => {
    const loginFormSchema = Yup.object().shape({
        email : Yup.string().email().required('This email is required'),
        password : Yup.string().required().min(8,'Your password must be atleast 8 characters')
    })

    const onLogin = async (email,password) =>{
        try {
            await signInWithEmailAndPassword(auth,email,password).then(data =>{
                console.log("Fire base login successful",data);
            })            
        } catch (error) {
            Alert.alert('My Lord',error.message,[
                {
                    text : 'Ok',
                    onPress : () => console.log('nothing'),
                    style : 'cancel'
                },{
                    text : 'Sign up',
                    onPress :  () => navigation.push('SignupScreen')
                }
            ])
        }
    }


    return (
        <View style={styles.wrapper}>
             <Formik
                initialValues={{email : '',password :''}}
                onSubmit={(values) => {
                    onLogin(values.email,values.password)
                }}
                validationSchema={loginFormSchema}
                validateOnMount={true}>   
                {({handleBlur,handleChange,handleSubmit,values,errors,isValid}) => (
                    <>
                        <View style={[styles.inputField,
                            {
                                borderColor : values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                            }
                        ]}>
                            <TextInput 
                                placeholderTextColor='#444'
                                placeholder='Phone Number or email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[styles.inputField,
                            {
                                borderColor : 1 > values.password.length  || values.password.length >= 6 ? '#ccc' : 'red'
                            }
                        ]}>
                            <TextInput 
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View style={{alignItems : 'flex-end',marginBottom : 30}}>
                            <Text style={{color : '#6bb0f5'}}>Forget Password ?</Text>
                        </View>
                        <Pressable titleSzie={20} style={styles.button(isValid)} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Log in</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Don't have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                <Text style={{color : '#6bb0f5'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    ) 
}

const styles = StyleSheet.create({
    wrapper : {
        marginTop : 80,
    },
    inputField : {
        borderRadius : 4,
        padding : 12,
        backgroundColor : '#FAFAFA',
        marginBottom : 10,
        borderWidth : 1,
    },
    button :(isValid)=>({
        backgroundColor : isValid ? '#0096f6' : '#9ACAF7',
        alignItems : 'center',
        justifyContent :'center',
        minHeight : 42,
        borderRadius : 4
    }),
    buttonText :{
        fontWeight : '600',
        color : '#fff',
        fontSize : 20
    },
    signupContainer : {
        flexDirection : 'row',
        width  : '100%',
        justifyContent : 'center',
        marginTop : 50
    }
})
export default LoginForm
