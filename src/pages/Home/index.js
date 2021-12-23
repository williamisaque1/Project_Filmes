import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { set } from "react-native-reanimated";

//console.disableYellowBox = true;

export default function Home({ navigation }) {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [contador, setContador] = useState(2);
  const [digitado, setDigitado] = useState(undefined);

  const url = "https://api.tvmaze.com";

  useEffect(() => {
    console.log("use Memo");
    loadMoviess();
    console.log(input.length == 0 && digitado == true);

    return () =>
      page == 1 && input.length > 0 && digitado == false && setMovie([]);
  }, [input, page]);

  const loadMoviess = useCallback(async () => {
    console.log(
      "informacoes " +
        " tam " +
        input.length +
        " tam filmes " +
        movie.length +
        " digitado " +
        digitado
    );

    if (
      (input.length == 0 && digitado == undefined) ||
      (input.length == 0 && digitado == true)
    ) {
      setLoading(true);
      console.log("filmes", movie.length);

      setDigitado(false);

      console.log("filmes||", movie.length);
      const response = await api.get(`/shows?page=${page}`);
      console.log("1º if page||", page + " tamanho" + response.data.length);
      setMovie([
        ...movie,
        ...response.data /*.slice(
        response.data.length - 20,
        response.data.length
      ),*/,
      ]);
      setLoading(false);
    }

    if (
      (input.length > 0 && digitado == false) ||
      (input.length > 0 && digitado == true)
    ) {
      console.log("3º if page||", page);
      // setMovie([]);
      setPage(1);
      const response = await api.get(`/search/shows?q=${input}`);
      setMovie(response.data);
      setDigitado(true);
    }
    if (input.length == 1 && digitado == true) {
      // loadMoviess();
      setMovie([]);
    }
  }, [page, input]);

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
    console.log(e);
    setInput(e);
  }
  async function handlePage() {
    console.log("pagina", page);

    setPage(page + 1);
    setDigitado(undefined);
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
      {input == "" ? (
        <List
          data={movie}
          keyExtractor={(item, index) => String(index)}
          // key={(item) => item.id}

          onEndReachedThreshold={0.01}
          onEndReached={() => {
            handlePage();
          }}
          scrollEnabled={!loading}
          //onEndReached={handlePage}
          ListFooterComponent={
            <ActivityIndicator animating={loading} size={50} color="#E02041" />
          }
          numColumns={3}
          renderItem={({ item, index }) => (
            <Link
              onPress={() =>
                //handleNavigate(input.length == 0 ? item?.show?.id : item.id)
                console.log(
                  "navegar(" +
                    page +
                    ")" +
                    item?.show?.id +
                    "|" +
                    item.id +
                    "||" +
                    index
                )
              }
              underlayColor="transparent"
            >
              <MovieInfo>
                <ImageMovie
                  resizeMode="contain"
                  source={{
                    uri: item?.image?.medium,
                  }}
                />
              </MovieInfo>
            </Link>
          )}
        ></List>
      ) : (
        <List
          data={movie}
          keyExtractor={(item, index) => String(index)}
          //key={(item) => item.id}
          onEndReached={console.log("chamou o segundo flex")}
          onEndReachedThreshold={0.1}
          numColumns={3}
          renderItem={({ item, index }) => (
            <Link
              onPress={() =>
                //handleNavigate(input.length == 0 ? item?.show?.id : item.id)
                console.log(
                  "navegar(2)" + item?.show?.id + "|" + item.id + "||" + index
                )
              }
              underlayColor="transparent"
            >
              <MovieInfo>
                <ImageMovie
                  resizeMode="contain"
                  source={{
                    uri: item?.show?.image?.medium,
                  }}
                />
              </MovieInfo>
            </Link>
          )}
        ></List>
      )}
    </Background>
  );
}
