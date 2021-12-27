import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../../pages/Home";
import Details from "../../pages/Details";
import DetailsActors from "../../pages/detailsActors";
//import Actors from "../../components/Actors";

const PopularNavigator = createAppContainer(
  createStackNavigator(
    {
      Home,
      Details,
      DetailsActors,
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#2b2929",
        },
        headerTitle: "Project Filmes",
        headerTitleAlign: "center",
        headerTintColor: "red",
        animationEnabled: false,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      },
    }
  )
);

export default PopularNavigator;
