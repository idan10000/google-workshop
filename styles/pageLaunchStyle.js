import { StyleSheet, Text, View } from 'react-native';

export const pageLaunchStyle = StyleSheet.create({
    totalWrapper:{
        paddingTop: 50,
        flex: 1,

    },
    appNameHeader:{
        fontSize:70,
        alignItems: 'center',
        justifyContent: 'center',
        margin:8,

    },
    slogenContainer:{
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',


    },
    appLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        height:150,
        width:170,
        resizeMode: 'stretch',
        marginBottom:'5%'

    },

    AvatarContainer:{
        marginVertical:10,
        marginTop:30,
        justifyContent: 'center',
        flexDirection: "row",

    },

    avatar:{
        marginRight:10,
        marginLeft:10,
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
        marginTop:30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",

    },
    sellingText:{
        textAlign: 'center',
        marginTop:40,
        justifyContent: 'center',
        alignItems: 'center',
    }, bottomText: {
        fontSize: 16,
    },
    howToSign: {
        marginTop:30,
        flexDirection:'column',
        justifyContent: 'center',
    },
    cliclHere: {
        fontSize:20,
        fontWeight: 'bold'
    },
        bigTitle: {
            color: "#1B1209",
            fontSize: 24,
            fontWeight: "700",
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',

        },
    emailRegist: {
        alignItems: 'center',
        justifyContent: 'center',
        Color:"#1B1209",
    }


});
