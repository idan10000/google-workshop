
import React from 'react';
import { StyleSheet, Button, TextInput, View, Text,TouchableOpacity,Image , Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from './styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const useTogglePasswordVisibility = () => {

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
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  
export default function ReviewForm() {

  const reviewSchema = yup.object({
    FirstName: yup.string()
      .required('First Name is required'),
    LastName: yup.string()
      .required('Last Name is required'),
    DateOfBirth:yup.date().typeError('This is not a valid date'),
    Email: yup.string().email().required('Email is required'),
    Password: yup.string().min(6),

    PhoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid')
      
  });
  return (
    
    <View style={globalStyles.container}>
      <View style={globalStyles.logoheaderContainer}>  
        <View style={globalStyles.header}>
         <Text style={globalStyles.header}>Welcome To FinDog</Text>
      </View>
      <TouchableOpacity > <Image source={require('./assets/findog.png')} style={globalStyles.image}/></TouchableOpacity>
      </View>
      <View style={globalStyles.welcome}>  <Text style={globalStyles.welcome}> First of all... Let's get to know you...</Text> </View>

      <Formik
        initialValues={{ FirstName: '', LastName: '',DateOfBirth:'', Email: '',Password:'', PhoneNumber: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='First Name'
              onChangeText={props.handleChange('FirstName')}
              onBlur={props.handleBlur('FirstName')} 

              value={props.values.FirstName}
            />
            <Text style={globalStyles.errorText}>{props.touched.FirstName && props.errors.FirstName}</Text>
            
            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='Last Name'
              onBlur={props.handleBlur('LastName')} 

              onChangeText={props.handleChange('LastName')}
              value={props.values.LastName}
            />
            <Text style={globalStyles.errorText}>{props.touched.LastName && props.errors.LastName}</Text>

            
            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='** Date Of Birth'
              onBlur={props.handleBlur('DateOfBirth')} 

              onChangeText={props.handleChange('DateOfBirth')}
              value={props.values.DateOfBirth}
            />
            <Text style={globalStyles.errorText}>{props.touched.DateOfBirth && props.errors.DateOfBirth}</Text>
            <TextInput 
              style={globalStyles.input}
              placeholder='Email'
              onBlur={props.handleBlur('Email')} 

              onChangeText={props.handleChange('Email')}
              value={props.values.Email}
              keyboardType='numeric'
            />
            <Text style={globalStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>
            <View style={globalStyles.inputContainer}>
            <TextInput secureTextEntry={passwordVisibility}
              style={globalStyles.input}
              placeholder='Password'
              onBlur={props.handleBlur('Password')} 

              onChangeText={props.handleChange('Password')}
              value={props.values.Password}
              keyboardType='numeric'
            />
          <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
          </Pressable>
            </View>
            <Text style={globalStyles.errorText}>{props.touched.Password && props.errors.Password}</Text>

            <TextInput 
              style={globalStyles.input}
              placeholder='** Phone Number'
              onBlur={props.handleBlur('PhoneNumber')} 

              onChangeText={props.handleChange('PhoneNumber')}
              value={props.values.PhoneNumber}
              keyboardType='numeric'
            />
            <Text style={globalStyles.errorText}>{props.touched.PhoneNumber && props.errors.PhoneNumber}</Text>
            <View style={globalStyles.inform}>  <Text> ** is optional</Text> </View>

            <Button color='maroon' title="Submit" onPress={props.handleSubmit} style={globalStyles.button} /> 
          
          </View>
        )}
      </Formik>
          
    </View>
    
  );
}