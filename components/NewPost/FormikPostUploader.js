import React,{useState,useEffect} from 'react'
import { View, Text, Image, TextInput, Button, Alert } from 'react-native'
import * as Yup from 'yup'
import {Formik}  from 'formik'
import { color } from 'react-native-elements/dist/helpers'
import { Divider } from 'react-native-elements'
import validUrl  from 'valid-url';
import {auth,db} from '../../firebase';
import {getFirestore, collection, query, where, getDocs,onSnapshot, FieldValue,doc,setDoc,addDoc, serverTimestamp} from 'firebase/firestore'

const PLACEHOLDER_IMAGE  = 'https://via.placeholder.com/100'

const uploadPostSchema = Yup.object().shape({
    imageUrl : Yup.string().url().required('A URL is Required'),
    caption : Yup.string().max('2200', 'Caption has reached it character limit')

})

const FormikPostUploader = ({navigation}) => {
    const [thumbnaillUrl,setThumbnailUrl] = useState(PLACEHOLDER_IMAGE)
    const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null)
    const getUserName = async () => {
        const user  = auth.currentUser;
        console.log(user.uid);
        const q =  onSnapshot(collection(db, "users"), where("owner_id", "==", user.uid),(snap) =>{
            snap.docs.map(doc =>{ 
                // console.log(doc.data())
                let data = {
                    username : doc.data().username,
                    profilePicture : doc.data().profile_picture,
                }
                console.log(data);
                setcurrentLoggedInUser(data)
            });
         });
        // const unsubscribe =  getDocs(q).then();
        return q;
    }
    useEffect(() => {
        getUserName()
    }, [])

    const uploadProfileImage = async (imageUrl,caption) =>{
        try {
            let userDoc = doc(db,'users',auth.currentUser.email);
            const unsubscribe =  await addDoc(collection(userDoc, "posts"), {
                imageUrl: imageUrl,
                user : currentLoggedInUser.username,
                profile_picture : currentLoggedInUser.profilePicture,
                owner_uid : auth.currentUser.uid,
                owner_email : auth.currentUser.email,
                caption : caption,
                createdAt : serverTimestamp(),
                likes_by_users : [],
                comments: []
            });
            navigation.goBack()
            return unsubscribe;
        } catch (error) {
            Alert.alert(error.message)
        }
        
    }

    return (
        <View>
            <Formik
                initialValues={{caption : '',imageUrl : ''}}
                onSubmit={(values) => {
                    uploadProfileImage(values.imageUrl,values.caption)
                    // console.log(values)
                    // console.log('You post was successful');
                    // navigation.goBack();
                }}
                validationSchema={uploadPostSchema}
                validateOnMount={true}
            >
                {({handleBlur,handleChange,handleSubmit,values,errors,isValid}) => (
                    <>
                        <View style={{margin : 20, justifyContent : 'space-between',flexDirection: 'row'}}>
                            <Image source={{uri : validUrl.isUri(thumbnaillUrl) ? thumbnaillUrl : PLACEHOLDER_IMAGE}} style={{ width : 100, height : 100}}/>   
                            <View style={{flex : 1, marginLeft : 12}}>                     
                                <TextInput
                                    placeholder='Write a Caption'
                                    placeholderTextColor='gray'
                                    multiline={true}
                                    style={{color:'white', fontSize : 20}}
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption}
                                />   
                            </View>                         
                        </View>
                        <Divider width={0.2} orientation='vertival'/>

                        <TextInput
                            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                            placeholder='Enter Image URL'
                            placeholderTextColor='gray'
                            style={{color:'white',fontSize : 18}}
                            onChangeText={handleChange('imageUrl')}
                            onBlur={handleBlur('imageUrl')}
                            value={values.imageUrl}
                        />
                        {errors.imageUrl && (
                            <Text style={{fontSize : 10, color : 'red'}}>
                                {errors.imageUrl}
                            </Text>
                        )}
                        <Button onPress={handleSubmit} title='Share' disabled={!isValid}/>
                    </>
                )}
                
            </Formik>
        </View>
    )
}

export default FormikPostUploader
