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
} from "./styles";

import api from "../../services/api";
import Skeleton from "../Skeleton component/Skeleton";
import Axios from "axios";

export default function Actors() {
  const movieID = useSelector((state) => state.actors);
  const url = "https://image.tmdb.org/t/p/w185";

  const [actors, setActors] = useState(null);

  useEffect(() => {
    async function loadActors() {
      const response = (await api.get("/shows/1/cast")).data;

      setActors(response);
      //console.log("resposta", actors?.character.image.medium);
    }
    loadActors();

    /* if (actors != null) {
      actors.forEach(({ id }) => {
        console.log("jjjj", id);
      });
      
    }
*/
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
          renderItem={({ item }) => (
            <ActorInfo>
              <ActorImage source={{ uri: item.person.image.medium }} />
              <ActorName> {item.person.name} </ActorName>
            </ActorInfo>
          )}
        />
      ) : (
        <Skeleton></Skeleton>
      )}
    </Container>
  );
}
