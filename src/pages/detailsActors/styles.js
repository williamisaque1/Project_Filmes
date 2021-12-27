import styled from "styled-components";

export const Container = styled.View``;

export const MovieBackground = styled.ImageBackground`
  flex: 1;
  opacity: 0.9;
  align-items: center;
  justify-content: center;
`;

export const MovieInfo = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

export const MovieImage = styled.Image`
  width: 155px;
  height: 250px;
  margin-left: 20px;
  max-width: 320px;
  min-width: 120px;
`;

export const MovieDetails = styled.View`
  background: #2b2b28;
  max-width: 220px;
  min-width: 180px;
  max-height: 250px;
  min-height: 245px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #ffce00;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export const Description = styled.Text.attrs({
  // numberOfLines: 5,
})`
  color: #fff;
  margin-bottom: 5px;
  margin-left: 7px;
`;

export const Generes = styled.Text`
  color: #fff;
  margin-top: 5px;
  margin-left: 5px;
`;

export const MovieNumbers = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
`;

export const DateInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;

export const Date = styled.Text`
  margin-left: 5px;
  color: #fff;
`;

export const DurationInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
`;

export const Duration = styled.Text`
  color: #fff;
`;

export const OthersInfo = styled.View``;

export const Loading = styled.View`
  flex: 1;
  background: #2b2b28;
  align-items: center;
  justify-content: center;
`;
