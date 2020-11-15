import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import GlobalStyles from "../constants/GlobalStyles";
import ShopItem from "./lists/shopItem";
import {getShops} from "../repositories/requests";

const Shops = ({navigation}) => {
    let [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getShops()
            .then((d) => d.list)
            .then((list) => setData(list))
            .catch((e) => console.log('e:', e))
    }, [])
    return (
        <View style={GlobalStyles.page}>
            <FlatList
                data={data}
                ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                renderItem={({item}) => {{
                    return (<ShopItem {...item}  type={'shops'} navigation={navigation}/>)
                }}}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

export default Shops;

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#EBEBEB'
    }
});
