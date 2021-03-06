import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Title, List, MovieInfo, MovieImage, Link } from "./styles";

import api from "../../services/api";
import Skeleton from "../Skeleton component/Skeleton";

export default function Recommendations({ navigation }) {
  const [recommendation, setRecommendation] = useState(null);
  const movieID = useSelector((state) => state.actors);
  const url = "https://image.tmdb.org/t/p/w185";

  useEffect(() => {
    async function loadRecommendations() {
      const response = (
        await api.get(
          `/movie/${movieID}/recommendations?api_key=14ff7d5e5b5ac073419275359d9759a0&language=pt-BR`
        )
      ).data.results;

      setRecommendation(response);
    }

    loadRecommendations();
    return () => loadRecommendations();
  }, []);

  const dispatch = useDispatch();

  function handleRedux(id) {
    dispatch({
      type: "@actor/id",
      id,
    });
  }

  function handleNavigate(id) {
    handleRedux(id);

    navigation.navigate("Details");
  }

  return (
    <Container>
      <Title>Recommendations</Title>
      {recommendation != null ? (
        <List
          data={recommendation}
          horizontal={true}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <MovieInfo>
              <Link onPress={() => handleNavigate(item.id)}>
                <MovieImage source={{ uri: url + item.poster_path }} />
              </Link>
            </MovieInfo>
          )}
        />
      ) : (
        <Skeleton></Skeleton>
      )}
    </Container>
  );
}
