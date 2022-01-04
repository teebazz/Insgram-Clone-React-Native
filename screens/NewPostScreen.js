import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import AddNewPost from '../components/NewPost/AddNewPost'
import GlobalStyles from '../GlobalStyles'

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[GlobalStyles.droidSafeArea,{backgroundColor : 'black',flex  : 1}]}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewPostScreen
