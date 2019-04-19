import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Map from "../../components/map";

class ListScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    users: [],
    loading: true
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => {
        this.setState({ users: json, loading: false });
      });
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" } }}
    />
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      /*
      <>
        <ActivityIndicator animating={this.state.loading} />
        <FlatList keyExtractor={this.keyExtractor} data={this.state.users} renderItem={this.renderItem} />
      
      </>*/
      <Map/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  textName: {
    fontWeight: "bold",
    fontSize: 30
  },
  textUser: {
    flex: 1,
    color: "tomato"
  }
});

export default connect(null)(ListScreen);
