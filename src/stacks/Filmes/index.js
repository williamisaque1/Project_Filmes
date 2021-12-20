import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../../screens/Filmes";

const NowNavigator = createAppContainer(
  createStackNavigator(
    {
      Home,
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

export default NowNavigator;
