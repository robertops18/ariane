import React, { Component } from "react";
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import LoginScreen from "../screens/login/Login";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/home/Home";
import SettingsScreen from "../screens/settings/Settings";
import ChangePassword from "../screens/change-password/change-password";
import ListScreen from "../screens/list/ListScreen";
import { MAIN_COLOR } from "react-native-dotenv";
import PasswordRecover from "../screens/password-recover/password-recover";

const commonOptions = {
  headerStyle: {
    backgroundColor: MAIN_COLOR
  },
  headerTitleStyle: {
    color: "#fff"
  }
};

const AuthStack = createStackNavigator({ SignIn: LoginScreen, PasswordRecover: PasswordRecover });

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: MAIN_COLOR
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTitle: "Home"
    }
  }
});

const ListStack = createStackNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: MAIN_COLOR
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTitle: "Listado"
    }
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: SettingsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: MAIN_COLOR
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTitle: "Mi perfil"
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: () => commonOptions
  }
});

const TabScreen = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        headerStyle: {
          backgroundColor: MAIN_COLOR
        },
        headerTitleStyle: {
          color: "#fff"
        },
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={26} style={{ color: tintColor }} />
      }
    },
    List: {
      screen: ListStack,
      path: "userList",
      navigationOptions: {
        tabBarLabel: "Listado",
        headerStyle: {
          backgroundColor: MAIN_COLOR
        },
        headerTitleStyle: {
          color: "#fff"
        },
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list' size={26} style={{ color: tintColor }} />
      }
    },

    Settings: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Settings",
        headerStyle: {
          backgroundColor: MAIN_COLOR
        },
        headerTitleStyle: {
          color: "#fff"
        },
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-settings' size={26} style={{ color: tintColor }} />
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showLabel: true,
      style: {
        backgroundColor: "white"
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator({ AuthLoading: AuthLoadingScreen, App: TabScreen, Auth: AuthStack }, { initialRouteName: "AuthLoading" })
);
