import { StyleSheet, Text, View } from 'react-native';

export const global_styles = StyleSheet.create({
    general:{
        paddingTop: 50,
        flex: 1,

    },
    header:{
        fontSize:35,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    },
    container:{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:160,
        width:200,
        resizeMode: 'stretch',
        marginLeft: 10
      },

    Avatarcontainer:{
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
        flexDirection: "row",
        
    },

    avatar:{
        marginRight:20,
        marginLeft: 20
    },
    container2:{
        justifyContent: 'center',

        flexDirection: "row",
        padding: 1,
        alignItems: 'center',

    },
    seperator1: {
        width: 70,
        height: 3,
        backgroundColor: '#333',
      },
      text:{
        margin: 13
    },
      seperator2: {
        width: 70,
        height: 3,
        backgroundColor: '#333',
      },
    signupButton:{
        height: 60,
        marginBottom:24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,

    },
    container_registered:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginBottom:400,

    },
    selling_text:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:15
    }

  });
  