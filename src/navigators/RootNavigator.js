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
import DetailsTasks from "../screens/details/Details-Tasks";
import Video from "../screens/video/Video";
import ARScreen from "../screens/ar/AR";

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
    headerLeft: <BackIcon color='#d25200' onPress={() => navigation.goBack() } />,
  })
};

const detailsTasks = {
  screen: DetailsTasks,
  navigationOptions: ({navigation}) => ({
    headerTransparent: true,
    headerLeft: <BackIcon color='#d25200' onPress={() => navigation.goBack()}/>
  })
};


const video = {
  screen: Video,
  navigationOptions: ({navigation}) => ({
    headerLeft: <BackIcon color='#d25200' onPress={() => navigation.goBack() } />,
  })
};

const ar = {
  screen: ARScreen,
  navigationOptions: ({navigation}) => ({
    headerLeft: <BackIcon color='#d25200' onPress={() => navigation.goBack() } />,
    header: null
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
      headerTitle: "Salidas"
    }
  },
  Details: details,
  DetailsTasks: detailsTasks,
  Video: video,
  ARScreen: ar
});

ListStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 2) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

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
      headerTitle: "Perfil"
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
        tabBarLabel: "Mapa",
        headerStyle: {
          backgroundColor: MAIN_COLOR
        },
        headerTitleStyle: {
          color: "#fff",
        },
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-map' size={26} style={{ color: tintColor }} />
      }
    },
    List: {
      screen: ListStack,
      path: "userList",
      navigationOptions: {
        tabBarLabel: "Salidas",
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
        tabBarLabel: "Perfil",
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
      activeTintColor: "#10a4ec",
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
