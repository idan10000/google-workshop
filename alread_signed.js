import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text,TouchableOpacity,Image , Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { AfterSignedStyle } from './styles/after_signed_style';
import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};
export default function App() {

   const reviewSchema = yup.object({
 
    Email: yup.string().email().required('Email is required'),
    Password: yup.string().min(6),

      
  });


  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  return (
    <View style={AfterSignedStyle.container}>
      <View style={AfterSignedStyle.logoheaderContainer}>  
        <View style={AfterSignedStyle.header}>
         <Text style={AfterSignedStyle.header}>FinDog</Text>
      </View>    
      <TouchableOpacity > <Image source={require('./assets/findog.png')} style={AfterSignedStyle.image}/></TouchableOpacity>
      </View>

      <View style={AfterSignedStyle.welcome}>  <Text style={AfterSignedStyle.welcome}> Welcome Back!</Text> </View>


      <Formik
        initialValues={{ Email: '',Password:''}}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {props => (

<View > 
    


<Text style={AfterSignedStyle.errorText}>{props.touched.DateOfBirth && props.errors.DateOfBirth}</Text>
<TextInput 
  style={AfterSignedStyle.input}
  placeholder='Email'
  onBlur={props.handleBlur('Email')} 

  onChangeText={props.handleChange('Email')}
  value={props.values.Email}
  keyboardType='numeric'
/>
<Text style={AfterSignedStyle.errorText}>{props.touched.Email && props.errors.Email}</Text>
<View style={AfterSignedStyle.inputContainer}>

<TextInput
  placeholder='Password'
  onBlur={props.handleBlur('Password')} 

  onChangeText={props.handleChange('Password')}
  value={props.values.Password}
  keyboardType='numeric'

  style={AfterSignedStyle.input}
  name="password"
  autoCapitalize="none"
  autoCorrect={false}
  textContentType="newPassword"
  secureTextEntry={passwordVisibility}
  enablesReturnKeyAutomatically
/>
<Pressable onPress={handlePasswordVisibility}>
  <MaterialCommunityIcons name={rightIcon} size={24} color="#232323" />
</Pressable>

<Text style={AfterSignedStyle.errorText}>{props.touched.Password && props.errors.Password}</Text>
</View>

<Button color='maroon' title="Sign me in!" onPress={props.handleSubmit} style={AfterSignedStyle.button} /> 
</View>

        )}
      </Formik>


    </View>
  );
}