import { StyleSheet } from 'react-native';

export const signUpStyles = StyleSheet.create({
  totalWrapper: {
    marginTop:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeaderContainer: {
    marginTop:20,

    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLogo:{
    alignItems: 'center',
    marginTop:'10%',
    justifyContent: 'center',
    height:92,
    width:113,
    resizeMode: 'contain',
    marginRight:20
},
  welcomeText:{
    marginVertical:"2%",
    fontSize: 20,
    marginLeft: '4%',
    fontWeight: 'bold',

  },
  input: {
    marginTop:2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    width:300,
    height:30,
    borderRadius: 6,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',

  },
  submitButton:{
    alignItems: 'center',
    justifyContent: 'center',
    color:"#1B1209",
    marginTop:'12%'

  },
  inform:{

    marginBottom:10
  },
  inputContainer: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',

  }, eyeIcon: {
    position:"absolute",
    right:'5%',

  },
  totalInput: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },



});

