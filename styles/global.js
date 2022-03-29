import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    header: {
      width: '100%',
      margin: 0,
      height: 80,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      backgroundColor:"white"
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color:"black",
      letterSpacing: 1,
    },
    button: {
      position: 'absolute',
      left: 10,
      top: 43
    },
  })