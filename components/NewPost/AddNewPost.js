import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FormikPostUploader from './FormikPostUploader'


const AddNewPost = ({navigation}) => {
    return (
       <View style={styles.container}>
           <Header navigation={navigation}/>
           <FormikPostUploader navigation={navigation}/>
           {/* Formic Post Uploader */}
       </View> 
    )
}


const Header  = ({navigation}) =>(
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={{uri : 'https://img.icons8.com/ios/50/ffffff/back--v1.png'}} style={{height : 30, width : 30}}/>                
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW POST</Text>
        <Text></Text>
    </View>
)

const styles = StyleSheet.create({
    container : {
        marginHorizontal : 10,    
    },
    headerContainer :{
        flexDirection :  'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    headerText : {
        color : '#ffffff',
        fontWeight : '700',
        fontSize : 20,
        marginRight : 25
    }
})

export default AddNewPost
