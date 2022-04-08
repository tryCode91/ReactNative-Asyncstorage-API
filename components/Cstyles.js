import React from 'react';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Colors } from './Colors';


export const Container = styled.View`
flex: 1;
align-items: center;
justify-content: center;
width: 100%;
background-color: #00cd00;
`
export const LogoContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
` 

export const Logo = styled.Image`
width: 200px;
height: 200px;
`;

export const Title = styled.Text`
text-align: center;
font-size: 30px; 
font-weight: bold;
padding: 10px;
color: #4d4dff;

${(props) => props.Home && `
  font-size: 35px;
`}

`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #000;

  ${(props) => props.Home && `
  margin-bottom: 5px;
  font-weight: normal;
`}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: #D3D3D3;
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: #1F2937;
`;

export const StyledInputLabel = styled.Text`
  color: #1F2937;
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
  color: #6D28D9;
`;


export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  justify-content: center;
  align-content: center;
  padding: 15px;
  background-color: #4d4dff;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  align-items: center;

`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #9CA3AF;
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  color: #1F2937;
  align-items: center;
  font-size: 15px;
`;


export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  
  align-items: center;
  
`;

export const TextLinkContent = styled.Text`
 
  color: #6D28D9;
 
  font-size: 15px;
`;






