import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { StatusBar, ActivityIndicator, FlatList } from "react-native";

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
import Skeleton from "../../components/Skeleton component/Skeleton";

//console.disableYellowBox = true;

export default function Home({ navigation }) {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [contador, setContador] = useState(2);
  const [digitado, setDigitado] = useState(false);
  const [newMovie, setNewMovie] = useState([]);

  const url = "https://api.tvmaze.com";

  useEffect(() => {
    console.log("use Memo");
    loadMoviess();
    console.log(input.length == 0 && digitado == true);

    return () => {
      input.length > 0 && setNewMovie([]);
      console.log("acionado");
    };
  }, [input]);

  async function loadMoviess() {
    console.log(
      "informacoes " +
        " tam " +
        input.length +
        " tam filmes " +
        movie.length +
        " digitado " +
        digitado
    );
    if (input.length == 0 && (digitado == false || digitado == true)) {
      const response = await api.get(`/shows?page=${page}`);

      setMovie([
        ...movie,
        ...response?.data /*.slice(
        response.data.length - 20,
        response.data.length**/,
      ]);
      setLoading(false);
      setDigitado(false);
      setPage(page + 1);
    } else {
      const response = await api.get(`/search/shows?q=${input}`);
      setNewMovie(response.data);
      setDigitado(true);
    }

    /*
    if (
      (input.length == 0 && digitado == undefined) ||
      (input.length == 0 && digitado == true)
    ) {
      console.log("filmes", movie.length);

      setDigitado(false);

      console.log("filmes||", movie.length);
      console.log("1º if page||", page + " tamanho" + response?.data.length);
      const response = await api.get(`/shows?page=${page}`);

      setMovie([
        ...movie,
        ...response?.data /*.slice(
        response.data.length - 20,
        response.data.length
      ),*/
    /*,
      ]);

      console.log(" tamanho " + movie.length);
      //
      setLoading(false);
      setPage(page + 1);
      //setDigitado(undefined);
    }
    if (input.length == 0 && digitado == false && page > 1) {
      console.log("||| " + input.length + "  " + digitado + "  " + page);
      setDigitado(undefined);
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
    */
  }

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

    loadMoviess();
    // setDigitado(undefined);
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
        <FlatList> </FlatList>
      </Container>
      {input == "" ? (
        <List
          data={movie}
          keyExtractor={(item, index) => String(index)}
          initialNumToRender={50}
          onEndReachedThreshold={0.01}
          onEndReached={(event) => {
            setLoading(true);
            handlePage();
          }}
          scrollEnabled={!loading}
          ListFooterComponent={
            movie.length == 0 && input.length == 0 ? (
              <></>
            ) : (
              <ActivityIndicator
                animating={loading}
                size={50}
                color="#E02041"
              />
            )
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
          data={newMovie}
          keyExtractor={(item, index) => String(index)}
          //key={(item) => item.id}
          //onEndReached={console.log("chamou o segundo flex")}
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
