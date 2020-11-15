import {
    SafeAreaView,
    View,
    StyleSheet,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
    Text,
    FlatList
} from "react-native";
import React, {useEffect, useState} from "react";
import {getCartById, getUserToken, postCart} from "../repositories/requests";
import {StatusBar} from "expo-status-bar";
import Constants from 'expo-constants';

export const CartScreen = ({route, navigation}) => {

    let [data, setData] = useState([]);
    const {cartId} = route.params;
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getCartById(cartId)
            .then((list) => setData(list))
            .catch((e) => console.log('e:', e))
            .finally(() => setIsLoading(false))
    }, [cartId])

    const RenderLoading = () => {
        return (
            <View style={styles.activityCont}>
                <ActivityIndicator
                    size="large"
                    color="#3c3c3c"
                    style={styles.activity}
                />
            </View>
        );
    };

    if (isLoading) {
        return (<RenderLoading/>);
    }


    const touch = () => {
        setIsLoading(true);
        postCart()
            .then((data) => data)
            .finally(() => {
                setIsLoading(false);
                navigation.navigate('Main');
            })
    }
    return (
        <>
            <StatusBar backgroundcolor='#fff' style='dark'/>
            <SafeAreaView style={styles.droidSafeArea}/>
            <View style={{flex: 1, backgroundColor: '#F8E94E'}}>
                <View style={{display: 'flex', padding: 30, alignItems: 'start'}}>
                    <Text style={{
                        alignSelf: 'center', display: 'flex',
                        fontSize: 24,
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 'bold',
                    }}>
                        Coffeeshop
                    </Text>
                </View>

                {data && data.cart && data.cart.list.length > 0 && (
                    <View>
                        <View style={{display: 'flex', padding: 10, alignItems: 'start'}}>
                            <Text style={{
                                alignSelf: 'flex-start', display: 'flex',
                                fontSize: 16,
                                fontFamily: 'Helvetica Neue',
                                fontWeight: 'bold',
                            }}>
                                Товары
                            </Text>
                        </View>
                        <FlatList
                            data={data.cart.list}
                            ItemSeparatorComponent={() => (<View style={styles.separator}/>)}
                            renderItem={({item}) => {
                                {
                                    return (<View style={{
                                        height: 60,
                                        justifyContent: 'space-between',
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        paddingHorizontal: 25
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Helvetica Neue',
                                            fontWeight: 'bold',
                                            color: '#000',
                                            fontSize: 14,
                                            lineHeight: 18
                                        }}>{item.position.title}</Text>

                                        <Text style={{
                                            fontFamily: 'Helvetica Neue',
                                            fontWeight: 'normal',
                                            color: '#000',
                                            fontSize: 14,
                                            lineHeight: 18
                                        }}>{item.position.price}</Text>
                                    </View>)
                                }
                            }}
                            keyExtractor={item => item.position.id}
                        />
                    </View>)}

                <View style={{paddingTop: 20}}>
                    <View style={{display: 'flex', padding: 10, alignItems: 'start'}}>
                        <Text style={{
                            alignSelf: 'flex-start', display: 'flex',
                            fontSize: 16,
                            fontFamily: 'Helvetica Neue',
                            fontWeight: 'bold',
                        }}>
                            Скидки
                        </Text>
                    </View>
                    <FlatList
                        data={data.offers}
                        ItemSeparatorComponent={() => (<View style={styles.separator}/>)}
                        renderItem={({item}) => {
                            {
                                return (<View style={{
                                    height: 60,
                                    justifyContent: 'space-between',
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingHorizontal: 25
                                }}>
                                    <Text style={{
                                        fontFamily: 'Helvetica Neue',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        fontSize: 14,
                                        lineHeight: 18
                                    }}>{item.offerType === 'AdditionalSale' ? 'Скидка ' + item.salePercent + '%' : item.freePosition.title}</Text>

                                    <Text style={{
                                        fontFamily: 'Helvetica Neue',
                                        fontWeight: 'normal',
                                        color: '#000',
                                        fontSize: 14,
                                        lineHeight: 18
                                    }}>до 17.11.2020</Text>
                                </View>)
                            }
                        }}
                        keyExtractor={item => item.offerType + Math.random(1, 53)}
                    />
                </View>

                <TouchableOpacity style={styles.toButton} onPress={touch}>
                    <Text style={styles.textButton}>
                        Оплатить
                    </Text>
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#EBEBEB'
    },
    activity: {
        display: 'flex',
        padding: 20,
        borderRadius: 4,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toButton: {
        paddingTop: 30,

    },
    textButton: {
        fontSize: 16,
        fontFamily: 'Helvetica Neue Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        backgroundColor: '#fff',
        padding: 15,
    },
    activityCont: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    droidSafeArea: {
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        backgroundColor: '#F8E94E',
        color: '#000'
    },
});

