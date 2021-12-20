import styled from "styled-components";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const Background = styled.ImageBackground`
  flex: 1;
`;

export const Container = styled.View`
  padding: 20px;
`;

export const Form = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #2b2929;
  background: white;
  border-radius: 4px;
  color: black;
  padding: 0 30px;
  height: 35px;
`;

export const List = styled.FlatList`
  margin-top: 10px;
  margin-horizontal: ${(windowWidth * 6) / 100};
`;

export const Link = styled.TouchableHighlight``;

export const MovieInfo = styled.View`
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

export const ImageMovie = styled.Image`
  width: 100px;
  height: 170px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const Loading = styled.View`
  flex: 1;
  background: #2b2b28;
  align-items: center
  justify-content: center;
  margin-bottom: 4%;
`;
