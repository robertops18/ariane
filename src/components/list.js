import React from "react";
import {StyleSheet, View, FlatList, Text, Dimensions} from "react-native";
import ListItem from './list-item';
import HorizontalSeparator from './horizontal-separator'


class List extends React.Component {
    emptyText = `No hay ${this.props.name} :(`;
    keyExtractor = item => item.id.toString();
    renderEmpty = () => <Empty text={this.emptyText} />;
    itemSeparator = () => <HorizontalSeparator />;

    render(){
        return(
            <View style={styles.container}>
                <ListLayout>
                    <FlatList
                        vertical
                        keyExtractor={this.keyExtractor}
                        data={this.props.data}
                        renderItem={ ({item}) => {
                            return (
                                <ListItem
                                    item={item}
                                    name={this.props.name}
                                    demo={this.props.demo}
                                />
                            )
                        }}
                        ListEmptyComponent={this.renderEmpty}
                        ItemSeparatorComponent={this.itemSeparator}
                    />
                </ListLayout>
            </View>
        );
    }
}

function Empty(props) {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{props.text}</Text>
        </View>
    )
}

function ListLayout(props) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: Dimensions.get('window').width
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    }
});

export default List;
