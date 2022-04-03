import { StyleSheet, Text, View } from 'react-native';

export const pageLaunchStyle = StyleSheet.create({
    totalWrapper:{
        paddingTop: 50,
        flex: 1,

    },
    appNameHeader:{
        fontSize:35,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    },
    slogenContainer:{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',

    },
    appLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        height:80,
        width:100,
        resizeMode: 'stretch',
    },

    AvatarContainer:{
        justifyContent: 'center',
        flex: 1,
        flexDirection: "row",

    },

    avatar:{
        marginRight:2,
        marginLeft:2,
    },
    containerForMiddleLines:{
        justifyContent: 'center',
        marginVertical:20,
        flexDirection: "row",
        padding: 1,
        alignItems: 'center',

    },
    orSeperator1: {
        flex:1,
        height: 3,
        backgroundColor: '#333',
    },
    text:{
        margin: 13
    },
    orSeperator2: {
        width: 70,
        height: 3,
        backgroundColor: '#333',
    },
    signupButton:{
        marginBottom:24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: "#816A55",
        shadowColor: "#00000021",
        width: 330,
        height: 60,
        shadowOffset: {
            width: 5,
            height: 5,
        }

    },
    containerForRegisterClick:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",

    },
    sellingText:{
        marginTop:20,
        marginBottom:10,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

});
