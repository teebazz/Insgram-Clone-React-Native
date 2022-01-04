import React from 'react'
import { View, Text, Image,StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import {auth,db} from '../../firebase';
import {getFirestore, collection, query, where, getDocs,onSnapshot, FieldValue,doc,setDoc,addDoc, serverTimestamp, arrayUnion,arrayRemove, updateDoc} from 'firebase/firestore'


const postFooterIcons= [
    {
        name : 'Like',
        imageUrl : 'https://img.icons8.com/ios-glyphs/30/ffffff/hearts.png',
        likeImageUrl : 'https://img.icons8.com/ios-filled/30/FF0000/like--v1.png'
    },
    {
        name : 'Comment',
        imageUrl : 'https://img.icons8.com/material-outlined/24/ffffff/speech-bubble--v2.png'
    },
    {
        name : 'Share',
        imageUrl : 'https://img.icons8.com/material-outlined/30/ffffff/sent.png'
    },
    {
        name : 'Save',
        imageUrl : 'https://img.icons8.com/fluency-systems-regular/48/ffffff/bookmark-ribbon--v1.png'
    }
]


const Post = ({post}) => {
    const handleLike = async (post) =>{
        try {
            const currentLikeStatus = !post.likes_by_users.includes(
                auth.currentUser.email
            )
            let userDoc = doc(db,`users/${auth.currentUser.email}/posts`,post.id);
            // let postRef = doc(userDoc,'posts',post.id);
            let updateDocs =  updateDoc(userDoc,{
                likes_by_users : currentLikeStatus ? arrayUnion(
                    auth.currentUser.email
                ) : arrayRemove(
                    auth.currentUser.email
                )
            });
            // const updateTimestamp = await updateDoc(postRef, {
            //    likes_by_users : currentLikeStatus ? FieldValue.arrayUnion(
            //     auth.currentUser.email
            //    ) : FieldValue.arrayRemove(
            //     auth.currentUser.email
            //    )
            // });
            console.log('Document Updated success');
        } catch (error) {
            console.log('Document Updated error : ', error);
        }
        
    }
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage  post={post}/>
            <View style={{marginHorizontal : 15, marginTop : 10}}>
                <PostFooter  post={post} handleLike={handleLike}/>
                <Likes post={post}/>
                <Caption post={post}/>
                <CommentSection post={post}/>
                <Comments post={post}/>
            </View>            
        </View>
    )
}

const PostHeader = ({post}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin : 10 , alignItems :'center'}}>
            <View style={{ flexDirection: 'row', alignItems :'center'}}>
                <Image source={{uri : post.profile_picture}} style={styles.story} />
                <Text style={{color : 'white',fontWeight : '500', marginLeft: 5}}>{post.user}</Text>
            </View> 
            <View><Text style={{color:'white',fontWeight :'900'}}>...</Text></View>
        </View>
    )
}

const PostImage = ({post}) =>(
    <View style={{width : '100%',height : 450}}>
        <Image source={{uri : post.imageUrl}} style={{height: '100%', resizeMode : 'cover'}}/>
    </View>
)

const PostFooter  = ({handleLike, post}) => (
    <View style={{flexDirection : 'row'}}>
        <View style={styles.leftFooterIconContainer}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image style={styles.footerIcon} source={{uri : 
                    post.likes_by_users.includes(
                        auth.currentUser.email
                    ) ? postFooterIcons[0].likeImageUrl : postFooterIcons[0].imageUrl
                }}/>
            </TouchableOpacity>
            {/* <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} /> */}
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
            <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
        </View>    
        <View style={{flex : 1, alignItems : 'flex-end'}}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
        </View>
    </View>    
)

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{uri : imgUrl}}/>
    </TouchableOpacity>
)

const Likes = ({post}) => (
    <View style={{flexDirection : 'row', marginTop : 4}}>
        <Text style={{color : 'white', fontWeight : '600'}}>{post.likes_by_users.length.toLocaleString('en')} Likes</Text>
    </View>
)

const Caption = ({post}) =>(
    <View style={{marginTop : 5}}>
        <Text style={{color :'white'}}>
            <Text style={{fontWeight:'600', marginRight : 10}}>{post.user} </Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)


const CommentSection = ({post}) =>(
    <View style={{marginTop : 5}}>
        {!!post.comments.length  && (
            <Text style={{color :'gray'}}>
            View 
                {post.comments.length > 1 ? ' all' : ' '}
                {post.comments.length > 1 ? ' comments' : ' comment'}
            </Text>
        )}        
    </View>
)

const Comments = ({post}) => (
    <>
    {post.comments.map((comment,index) =>(
        <View key={index} style={{flexDirection : 'row', marginTop : 5}}>
            <Text style={{color : 'white'}}>
                <Text style={{fontWeight : '600'}}>{comment.user} </Text>{' '}
                 {comment.comment}
            </Text>
        </View>
    ))}
    </>
)

const styles= StyleSheet.create({
    story : {
        width : 35,
        height : 35,
        borderRadius : 50,
        marginLeft : 6,
        borderWidth :1.5,
        borderColor : '#ff8501'
    },
    footerIcon : {
        width : 33,
        height : 33,
    },
    leftFooterIconContainer : {
        flexDirection : 'row',
        width : '32%',
        justifyContent : 'space-between'
    },
    shareIcon : {
        transform : [{rotate : '320deg'}],
        marginTop : -3
    }
})

export default Post
