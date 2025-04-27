import {
  View,
  Text,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, title, icon }) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row min-w-[112px] w-full flex-1 min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary ml-2 font-semibold text-base">
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="flex min-h-14 mt-4 rounded-full overflow-hidden w-full min-w-[112px] justify-center items-center">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};

const _layout = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // proper handling for both iOS/Android
      keyboardVerticalOffset={0} // adjust if you have a custom header
    >
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true, // hides tab bar when keyboard is open (prevents shifting)
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#0F0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 20,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0F0D23",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Home" icon={icons.home} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Search" icon={icons.search} />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Saved" icon={icons.save} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title="Profile" icon={icons.person} />
            ),
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
};

export default _layout;
