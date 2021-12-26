import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  Name,
  List,
  ActorInfo,
  ActorImage,
  ActorName,
  FalseName,
  ButtonAcao,
} from "./styles";

import api from "../../services/api";
import Skeleton from "../Skeleton component/Skeleton";
import Axios from "axios";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function Actors() {
  const movieID = useSelector((state) => state.actors);
  const url = "https://image.tmdb.org/t/p/w185";

  const [actors, setActors] = useState(null);

  useEffect(() => {
    async function loadActors() {
      console.log("idd - " + movieID.id);
      const response = (await api.get(`/shows/${movieID.id}/cast`)).data;

      setActors(response);
    }
    loadActors();

    return () => loadActors();
  }, []);

  return (
    <Container>
      <Name> Actors </Name>
      {actors != null ? (
        <List
          data={actors}
          horizontal={true}
          keyExtractor={(item) => String(item.person.id)}
          renderItem={({ item, index }) => (
            <ActorInfo>
              <ButtonAcao
                onPress={() => {
                  console.log("persinagem " + item.person?.id);
                }}
              >
                <ActorImage source={{ uri: item.person.image?.medium }} />
              </ButtonAcao>
              <ActorName
                style={actors.length - 1 == index && { marginRight: 20 }}
              >
                {" "}
                {item.person?.name}{" "}
              </ActorName>
            </ActorInfo>
          )}
        />
      ) : (
        <Skeleton></Skeleton>
      )}
    </Container>
  );
}
