import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Clock from "react-native-vector-icons/AntDesign";
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

export default function Details({ navigation }) {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://image.tmdb.org/t/p/w300";

  const scroll = [{}];
  const id = useSelector((state) => state.actors);

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);

      //setDetails(response.data);
      setLoading(false);
    }

    loadDetails();
  }, [id]);
  //console.log(id);
  if (loading) {
    return <Skeleton></Skeleton>;
  } else {
    return (
      <MovieBackground source={{ uri: id?.image?.original }}>
        <Container>
          <MovieInfo>
            <MovieImage
              source={{ uri: id?.image?.medium }}
              resizeMode="stretch"
            />

            <MovieDetails>
              <Title> {id.name} </Title>
              <ScrollView>
                <Description>
                  {" "}
                  {id.summary
                    .replace("<p>", "")
                    .replace("</p>", "")
                    .replace("<b>", "")
                    .replace("</b>", "")}{" "}
                </Description>
              </ScrollView>
              <Generes>{id.type}</Generes>

              <MovieNumbers>
                <DateInfo>
                  <Icon name="calendar" color="#ffce00" />
                  <Date>{id.premiered}</Date>
                </DateInfo>

                <DurationInfo>
                  <Clock name="clockcircle" color="#ffce00" />
                  <Duration> {id.premiered} min </Duration>
                </DurationInfo>
              </MovieNumbers>
            </MovieDetails>
          </MovieInfo>

          <OthersInfo>
            <Actors></Actors>
          </OthersInfo>
        </Container>
      </MovieBackground>
    );
  }
}
/*  <Actors />
                <Recommendations navigation={navigation} />*/
