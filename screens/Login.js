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
import { KeyboardAvoidingView } from 'react-native';
import Signup from './Signup';
//icons
import { Ionicons } from '@expo/vector-icons';

//formik
import { Formik } from 'formik';



export default function Login ({navigation}, props) {

    const [hidePassword, setHidePassword] = useState(true);

 

    const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
        return (
            <KeyboardAvoidingView>

                <LeftIcon>
                    <Ionicons name={icon} size={30} type="Ionicons" color="#4d4dff" />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledTextInput {...props} />
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
                
                <Logo source={require('../assets/LogoTest.png')} />
                
                <Title>Check ip</Title>
                
                <SubTitle>Account Login</SubTitle>

                <Formik

                    initialValues={{email: '', password: ''}}
                    
                    onSubmit={(values) => {
                    
                        console.log(values)
                    
                    }}

                >

                    {({handleChange, handleBlur, handleSubmit, values}) => 
                    <StyledFormArea>

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
                            <ExtraText>Don't have an account yet? </ExtraText>
                            <TextLink  >
                                <TextLinkContent >Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                     
                    </StyledFormArea>
                   
                    }

                </Formik>

            </LogoContainer>
            
        </Container>
    )

};


