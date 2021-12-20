import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StatusBar, ActivityIndicator } from "react-native";

import api from "../../services/api";
import bg from "../../assets/images/bg.jpg";

import {
  Container,
  Background,
  Form,
  Input,
  List,
  MovieInfo,
  ImageMovie,
  Link,
  Loading,
} from "./styles";

console.disableYellowBox = true;

export default function Home({ navigation }) {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  const url = "https://api.tvmaze.com";

  async function loadMovies(e) {
    setLoading(true);
    if (e != undefined) {
      handlePage();
    }
    if (input.length == 0) {
      setLoading(false);
    }

    const response = await api.get(`/shows?page=${page}`);

    setMovie([...movie, ...response.data]);

    setLoading(false);
  }

  useEffect(() => {
    loadMovies();
    return () => {};
  }, [page || input == ""]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get(`/search/shows?q=${input}`);

      setMovie(response.data);
      if (input.length == 0) {
        setInput("");
      }
    }

    loadMovies();

    return () => {};
  }, [input]);

  const dispatch = useDispatch();

  function handleRedux(id) {
    dispatch({
      type: "@actor/id",
      id,
    });
  }

  function handleNavigate(id) {
    navigation.navigate("Details", { id });

    handleRedux(id);
  }

  function handleInput(e) {
    setInput(e);
  }

  function handlePage() {
    setPage(page + 1);
  }

  return (
    <Background source={bg}>
      <Container>
        <StatusBar barStyle={"ligth-content"} backgroundColor="#2b2929" />

        <Form>
          <Input
            placeholder="Pesquise pelo título do filme ..."
            value={input}
            onChangeText={(e) => handleInput(e)}
          />
        </Form>
      </Container>

      <List
        data={movie}
        keyExtractor={(item) =>
          String(input.length == 0 ? item?.id : item?.show?.id)
        }
        onEndReached={(e) => loadMovies(e)}
        onEndReachedThreshold={0.1}
        numColumns={3}
        renderItem={({ item }) => (
          <Link
            onPress={() =>
              handleNavigate(input.length == 0 ? item?.show?.id : item.id)
            }
            underlayColor="transparent"
          >
            <MovieInfo>
              <ImageMovie
                resizeMode="contain"
                source={
                  input.length == 0
                    ? { uri: item?.image?.medium }
                    : { uri: item?.show?.image?.medium }
                }
              />
            </MovieInfo>
          </Link>
        )}
      />
      {loading && (
        <Loading>
          <ActivityIndicator size={40} color="#E02041" />
        </Loading>
      )}
    </Background>
  );
}
