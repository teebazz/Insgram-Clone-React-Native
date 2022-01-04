import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LoginForm from '../components/LoginScreen/LoginForm'
import SignupForm from '../components/SignupScreen/SignupForm'
const INSTAGRAM_LOGO = 'https://www.androidguys.com/wp-content/uploads/2015/04/insta-1024x352.png'
const SignupScreen = ({navigation}) => {
    return (
        <View style={styles.containter}>
            <View style={styles.logoContainer}>
                <Image source={{uri : INSTAGRAM_LOGO}} style={{height : '30%',resizeMode : 'contain'}}/>
            </View>
            <SignupForm navigation={navigation}/>
        </View>
    )
}



const styles = StyleSheet.create({
     containter :{
        flex : 1,
        backgroundColor : 'white',
        paddingTop : 60,
        paddingHorizontal : 12,
     },
     logoContainer :{
        justifyContent :'center',
        marginTop : 10
     }
})
 
export default SignupScreen
