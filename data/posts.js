import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl : 'https://i.ibb.co/182bP1y/4k.png',
        user  : USERS[0].user,
        likes : 7870,
        profile_picture : USERS[0].image,
        caption : '⭐ Register for the Instagram with React Native Challenge 👉 ',
        comments : [
            {
                user : 'theqazman',
                comment : 'Wow! this build looks fire, supper excited about it'
            },
            {
                user : 'amaanath.dev',
                comment : 'Fianlly, Something great'
            },
        ] 
    },
    {
        imageUrl : 'https://i.ibb.co/182bP1y/4k.png',
        user  : USERS[0].user,
        likes : 3500,
        profile_picture : USERS[0].image,
        caption : '🚀 You\'ll also skyrocket your design skills because the front-end design of this app is HEAVY',
        comments : [
            {
                user : 'theqazman',
                comment : 'Wow! this build looks fire, supper excited about it'
            },
            {
                user : 'amaanath.dev',
                comment : 'Fianlly, Something great'
            },
        ]
    }
]