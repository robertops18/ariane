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
import Details from "../screens/details/details";
import BackIcon from "../components/back-icon";

const commonOptions = {
  headerStyle: {
    backgroundColor: MAIN_COLOR
  },
  headerTitleStyle: {
    color: "#fff"
  }
};

const AuthStack = createStackNavigator({ SignIn: LoginScreen, PasswordRecover: PasswordRecover });

const details = {
  screen: Details,
  navigationOptions: ({navigation}) => ({
    headerTransparent: true,
    headerLeft: <BackIcon color='#780047' onPress={() => navigation.goBack() } />,
  })
};

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
      headerTitle: "Field Trips"
    }
  },
  Details: details
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
      headerTitle: "My profile"
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
        tabBarLabel: "Map",
        headerStyle: {
          backgroundColor: MAIN_COLOR
        },
        headerTitleStyle: {
          color: "#fff"
        },
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-map' size={26} style={{ color: tintColor }} />
      }
    },
    List: {
      screen: ListStack,
      path: "userList",
      navigationOptions: {
        tabBarLabel: "Field trips",
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
        tabBarLabel: "Profile",
        headerStyle: {
          backgroundColor: MAIN_COLOR
        },
        headerTitleStyle: {
          color: "#fff"
        },
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-person' size={26} style={{ color: tintColor }} />
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
