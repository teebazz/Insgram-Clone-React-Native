import React,{useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity,Alert } from 'react-native'
import * as Yup from 'yup'
import {Formik}  from 'formik'
import {auth,db} from '../../firebase';
import {createUserWithEmailAndPassword} from "firebase/auth"
import Validator from 'email-validator'
import { collection, addDoc,setDoc ,doc} from "firebase/firestore";  

const SignupForm = ({navigation}) => {
    const getRandomProfilePic = async () =>{
        const response = await fetch('https://randomuser.me/api');
        const data = await response.json();
        console.log(data);
        return data.results[0].picture.large;
    }

    const onSignUp = async (email, password,username) =>{
        try {
            const authUser = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db, "users",authUser.user.email), {
                owner_uid: authUser.user.uid,
                username : username,
                email : authUser.user.email,
                profile_picture : await getRandomProfilePic(),
              });
            console.log('Firebase user created successfully');

        } catch (error) {
          Alert.alert(error.message)  
        }
    }
    const loginFormSchema = Yup.object().shape({
        email : Yup.string().email().required('This email is required'),
        username : Yup.string().required().min(2,'This Username is required'),
        password : Yup.string().required().min(6,'Your password must be atleast 6 characters')
    })
    return (
        <View style={styles.wrapper}>
             <Formik
                initialValues={{email : '',username :'',password :''}}
                onSubmit={(values) => {
                    onSignUp(values.email,values.password,values.username)
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
                                borderColor : values.username.length > 2  ? '#ccc' : 'red'
                            }
                        ]}>
                            <TextInput 
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                keyboardType='default'
                                textContentType='username'
                                autoFocus={true}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
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
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text>Already 't have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{color : '#6bb0f5'}}>Log In</Text>
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
export default SignupForm
