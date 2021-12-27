import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Clock from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  MovieBackground,
  MovieInfo,
  MovieImage,
  MovieDetails,
  Title,
  Description,
  Generes,
  MovieNumbers,
  DateInfo,
  Date,
  DurationInfo,
  Duration,
  OthersInfo,
  Loading,
} from "./styles";

import Actors from "../../components/Actors";
import Recommendations from "../../components/Recommendations";
import api from "../../services/api";
import Skeleton from "../../components/Skeleton component/Skeleton";
import { ScrollView } from "react-native";

export default function DetailsActors({ navigation }) {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://image.tmdb.org/t/p/w300";

  const scroll = [{}];
  const id = useSelector((state) => state.actors);
  const idAtor = navigation.getParam("id");
  const imgFilme = navigation.getParam("img");
  console.log("iddddd|", idAtor);
  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      const response = (await api.get(`/people/${idAtor}`)).data;
      console.log("conteudoo", response);
      setDetails(response);

      setLoading(false);
    }

    loadDetails();
  }, []);

  //console.log(id);
  if (loading) {
    return <Skeleton></Skeleton>;
  } else {
    return (
      <MovieBackground source={{ uri: id?.image?.original }}>
        <Container>
          <MovieInfo>
            <MovieImage
              source={{ uri: details.image?.original }}
              resizeMode="stretch"
            />

            <MovieDetails>
              <Title> {details.name} </Title>
              <ScrollView>
                <Description>
                  country: {details.country?.name ?? "indisponivel"}
                </Description>
                <Description>
                  genero: {details?.gender ?? "indisponivel"}
                </Description>
              </ScrollView>
              <MovieNumbers>
                <DateInfo>
                  <Icon name="birthday-cake" color="#ffce00" />
                  <Date>{details.birthday ?? "não disponivel"}</Date>
                </DateInfo>
              </MovieNumbers>
            </MovieDetails>
          </MovieInfo>
        </Container>
      </MovieBackground>
    );
  }
}
/*  <Actors />
                <Recommendations navigation={navigation} />*/
