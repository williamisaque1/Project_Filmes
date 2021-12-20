import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import series from "./stacks/Series";
import filmes from "./stacks/Filmes";

const Routes = createAppContainer(
  createMaterialTopTabNavigator(
    {
      series,
      // filmes,
    },
    {
      tabBarOptions: {
        upperCaseLabel: false,
        showIcon: false,

        tabStyle: {
          height: 60,
          backgroundColor: "#2b2929",
        },

        activeTintColor: "white",
      },

      tabBarPosition: "bottom",
    }
  )
);

export default Routes;
