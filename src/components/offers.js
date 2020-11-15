import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import GlobalStyles from "../constants/GlobalStyles";
import ShopItem from "./lists/shopItem";
import {getOffers} from "../repositories/requests";


const Offers = ({navigation}) => {
    let [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true);
        getOffers()
            .then((d) => d.list)
            .then((list) => setData(list))
            .catch((e) => console.log('e:', e))
            .finally(() => setIsLoading(true))
    }, [])

    return (
        <View style={GlobalStyles.page}>
            <FlatList
                data={data}
                ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                renderItem={({item}) => {{
                    return (<ShopItem {...item}  type={'offers'} navigation={navigation}/>)
                }}}
                keyExtractor={item => item.shop.id.toString()}
            />
        </View>
    );
}

export default Offers;

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#EBEBEB'
    }
});
