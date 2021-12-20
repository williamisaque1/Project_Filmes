import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { View } from "react-native";

export default function Skeleton() {
  console.log("me chaamadno");
  const AnimatedValue = useRef(new Animated.Value(0.3));

  useEffect(() => {
    function cicleAnimated() {
      Animated.loop(
        Animated.sequence([
          Animated.timing(AnimatedValue.current, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(AnimatedValue.current, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
    cicleAnimated();
    return () => cicleAnimated();
  }, []);
  return (
    <View style={{ backgroundColor: "#ECEFF1", overflow: "hidden" }}>
      <Animated.FlatList
        style={{
          backgroundColor: "grey",
          width: "100%",
          height: "100%",
          opacity: AnimatedValue.current,
        }}
      ></Animated.FlatList>
    </View>
  );
}
