import React from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import {auth} from '../../firebase';

const signOut = async () =>{
    try {
        await auth.signOut()
        console.log('Signout successful');
    } catch (error) {
        console.log(erorr);
    }
}


const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={signOut}>
                <Image style={styles.logo} source={require('../../assets/header-logo.png')}></Image>
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
                <TouchableOpacity  onPress={() => navigation.push('NewPostScreen')}>
                    <Image style={styles.icon} source={{
                        uri : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'
                    }}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{
                        uri : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
                    }}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image style={styles.icon} source={{
                        uri : 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'
                    }}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        marginHorizontal : 20
    },
    logo : {
        width : 100,
        height : 50,
        resizeMode : 'contain'
    },
    iconsContainer : {
        flexDirection :'row'
    },
    icon:{
        width : 30,
        height : 30,
        marginLeft : 10,
        resizeMode : 'contain'
    },
    unreadBadge : {
        backgroundColor : '#FF3250',
        position : 'absolute',
        left : 20,
        bottom : 18,
        width : 25,
        height : 18,
        borderRadius : 25,
        alignItems : 'center',
        justifyContent : "center",
        zIndex : 100, // bring to the front
    },
    unreadBadgeText : {
        color : 'white',
        fontWeight : '600'
    }
});

export default Header 
