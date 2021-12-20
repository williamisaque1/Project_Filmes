import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../../pages/Home";
import Details from "../../pages/Details";

const PopularNavigator = createAppContainer(
  createStackNavigator(
    {
      Home,
      Details,
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
