import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { global_styles } from './styles/global_style';
import { Avatar, Button } from 'react-native-paper';
export default function App() {
  return (
   <View style ={global_styles.general}>
     <View style={global_styles.header}>
         <Text style={global_styles.header}> FinDog</Text>
      </View>
       <  View style={global_styles.container}>

       <View>
         <Text >Lost your dog?{'\n'}Don't worry!{'\n'}We'll help U find it </Text>
      </View>
    <Image
      style={global_styles.image}
      source={require('./assets/findog.png')}
    />
    </View>
    <View style={global_styles.selling_text}>

    <Text >Our app provides a revolutionary platform{'\n'}which offers dog-owners a new simple, effective way
    {'\n'}to find their precious dogs </Text>

    </View>



    <View style={global_styles.Avatarcontainer}>
    <TouchableOpacity ><Avatar.Image size={50} source={require('./assets/facebook.png')} style={global_styles.avatar}/></TouchableOpacity>
    <TouchableOpacity > <Avatar.Image size={50} source={require('./assets/google.png')} style={global_styles.avatar}/></TouchableOpacity>
  </View>
  <View style={global_styles.container2}>
  <View style={global_styles.seperator1} />
  <Text style={global_styles.text}>OR</Text>
  <View style={global_styles.seperator2} /> </View>

  <View style={global_styles.signupButton}>
      <Button mode='contained' title = "Sign up Via Email">  </Button>
     </View>

  <View style={global_styles.container_registered} >
     <Text> Already registerd?</Text>
     <TouchableOpacity >  <Text> click HERE</Text> </TouchableOpacity>
     </View>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
