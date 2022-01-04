import React,{useEffect,useState} from 'react'
import { View, Text,SafeAreaView,StyleSheet,ScrollView ,Platform} from 'react-native'
import BottomTab, { bottomTabIcons } from '../components/Home/BottomTab'
import Header from '../components/Home/Header'
import Post from '../components/Home/Post'
import Stories from '../components/Home/Stories'
import { POSTS } from '../data/posts'
import {auth,db} from '../firebase';
import { collection, addDoc ,collectionGroup,getDocs} from "firebase/firestore";  

const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        getDocs(collectionGroup(db, "posts")).then(snap =>{
            setPosts(snap.docs.map(doc =>  ( 
                {id:doc.id,... doc.data()}
                )
            ));
        })
    }, [])

    return (
        <SafeAreaView style={styles.containter}>
            <Header navigation={navigation}/>
            <Stories/>
            <ScrollView>
                {
                    posts.map((post,index)=>(
                        <Post post={post} key={index}/>
                   )) 
                }
                              
            </ScrollView>
            <BottomTab icons={bottomTabIcons}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containter : {
        backgroundColor : 'black',
        flex : 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
})



export default HomeScreen


