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

//console.disableYellowBox = true;

export default function Home({ navigation }) {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [contador, setContador] = useState(0);

  const url = "https://api.tvmaze.com";

  async function loadMoviess() {
    setLoading(true);
    if (input.length == 0) {
      if (page == 1) {
        //console.log("input tamanho", input.length);
        //setMovie(null);
        const response = await api.get(`/shows?page=${page}`);
        console.log("page||", page);
        setMovie([
          ...movie,
          ...response.data /*.slice(
            response.data.length - 20,
            response.data.length
          ),*/,
        ]);

        setLoading(false);
      }
    } else {
      if (input.length > 1) {
        console.log("input", input.length);
        setMovie([]);
        const response = await api.get(`/search/shows?q=${input}`);
        setMovie(response.data);

        // hasDuplicates(movie).forEach((item) => console.log(item.show.id)); //
        console.log("novo array tam", new Set(movie).size);
        setLoading(false);
      } else {
        console.log("input||", input.length);
        setMovie([]);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    // console.log("pagina inicial", page);
    console.log("chamada inicial");
    loadMoviess();
  }, []);
  useEffect(() => {
    if (page > 1) {
      //  console.log("pagina tem que ser maior que 1", page);
      loadMoviess();
    }
  }, [page]);
  useEffect(() => {
    console.log("chamada input");
    loadMoviess();
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

  async function handlePage() {
    if (input.length > 0 || input.length == 0) {
      setLoading(true);
      if (input.length == 0) {
        setPage(page + 1);
      } else {
        setPage(1);
      }

      const response = await api.get(`/shows?page=${page}`);
      console.log("page dentro||", page);
      setMovie([
        ...movie,
        ...response.data /*.slice(response.data.length - 20, response.data.length)*/,
      ]);

      setLoading(false);
      //console.log("pagina baixo", page);
      //loadMoviess();
    }
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

          onEndReachedThreshold={0.5}
          onEndReached={() => {
            handlePage();
          }}
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
