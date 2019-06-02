import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

class ListItem extends React.Component {

    onPress = () => {
      if (this.props.name == 'field trips') {
        this.props.navigation.navigate('Details', {item: this.props.item});
      } else {
        this.props.navigation.navigate('DetailsTasks', {item: this.props.item});
      }

    };

    renderInfo = () => {
      if (this.props.name === 'field trips') {
        return (
          <View style={styles.right}>
            <Text
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {this.props.item.field_title}
            </Text>

            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {this.props.item.school.school_name}
            </Text>
          </View>
        )
      } else if (this.props.name === 'tasks') {
        return (
          <View style={styles.right}>
            <Text
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {this.props.item.task_name}
            </Text>

            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {this.props.item.type}
            </Text>
          </View>
        )
      }
    }

    render(){
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.onPress}
            >
                {this.renderInfo()}
                <View style={styles.arrowIcon}>
                    <Icon name='ios-arrow-forward' size={18} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    img: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    right: {
        paddingLeft: 10,
        justifyContent: 'space-between',
        width: '70%'
    },
    title: {
        fontSize: 18,
        paddingTop: 8,
        color: 'black',
        fontFamily: 'Montserrat-Regular'
    },
    titleBold: {
        fontSize: 18,
        paddingTop: 8,
        color: 'black',
        fontFamily: 'Montserrat-Bold',
    },
    subtitle: {
        fontSize: 15,
        paddingBottom: 8,
        color: '#070707',
        fontFamily: 'Montserrat-Regular'
    },
    subtitleBold: {
        fontSize: 15,
        paddingBottom: 8,
        color: '#070707',
        fontFamily: 'Montserrat-Bold',
    },
    arrowIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 20
    }
});

export default withNavigation(connect(mapStateToProps) (ListItem))
