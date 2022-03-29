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
  header:{
    fontSize: 34,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:20,
  },
  appLogo:{
    alignItems: 'center',
    justifyContent: 'center',
    height:85,
    width:100,
    resizeMode: 'stretch',
    marginRight:20
},
  welcomeText:{
    marginTop: 5,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginBottom:8,

  },
  input: {
    marginTop:2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    width:300,
    borderRadius: 6,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',

    textAlign: 'center',
  },
  submitButton:{
    alignItems: 'center',
    justifyContent: 'center',
    width:800,
    marginBottom:10

  },
  inform:{

    marginBottom:10
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',

  }, eyeIcon: {
    position:"absolute",
    left:10
  }


});

