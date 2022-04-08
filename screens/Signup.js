import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    Container, 
    Title, 
    Logo, 
    LogoContainer, 
    SubTitle, 
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
 } from '../components/Cstyles';

 //datetimepicker
 import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';


//icons
import { Ionicons } from '@expo/vector-icons';


//formik
import { Formik } from 'formik';



export default () => {

    const [hidePassword, setHidePassword] = useState(true);
    const [show,setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    
    //actual date of birth
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }
    const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
        return (
            <KeyboardAvoidingView>

                <LeftIcon>
                    <Ionicons name={icon} size={30} type="Ionicons" color="#4d4dff" />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                {!isDate && <StyledTextInput {...props} />}
                {isDate && <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                    </TouchableOpacity>}
                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} type="Ionicons" color="#4d4dff" />
                    </RightIcon>
                )}
            </KeyboardAvoidingView>
        )
    }

    return ( 
        <Container>
            <StatusBar style="dark" />
            <LogoContainer>
                <Title>Check ip</Title>
                <SubTitle>Account Login</SubTitle>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={date}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Formik

                    initialValues={{fullName: '', email: '', dateOfBirth: '',  password: '', confirmPassword: ''}}
                    
                    onSubmit={(values) => {
                    
                        console.log(values)
                    
                    }}

                >

                    {({handleChange, handleBlur, handleSubmit, values}) => 
                    <StyledFormArea>

                        <MyTextInput 
                            label="Full Name"
                            icon="person"
                            placeholder="Petrus Dughem"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}                         
                        />

                        <MyTextInput 
                            label="Email Address"
                            icon="mail"
                            placeholder="example@yahoo.com"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />

                        <MyTextInput 
                            label="Date of Birth"
                            icon="calendar"
                            placeholder="YYYY - MM - DD"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={handleChange('dateOfBirth')}
                            onBlur={handleBlur('dateOfBirth')}
                            value={dob ? dob.toDateString() : ''}     
                            isDate = {true}                    
                            editable={false}
                            showDatePicker={showDatePicker} 
                        />

                         <MyTextInput 
                            label="Confirm Password"
                            icon="lock-closed"
                            placeholder="* * * * * * * *"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        
                        <MyTextInput 
                            label="Password"
                            icon="lock-closed"
                            placeholder="* * * * * * * *"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <MsgBox>...</MsgBox>
                        <StyledButton>
                         <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account?</ExtraText>
                            <TextLink>
                                <TextLinkContent>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                     
                    </StyledFormArea>
                   
                    }

                </Formik>

            </LogoContainer>
            
        </Container>
    )

  


};




