import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    SafeAreaView, Platform
} from "react-native";
import React, {useEffect, useState} from "react";
import Back from "../../assets/images/back.svg"
import {getShopById} from "../repositories/requests";
import {StatusBar} from "expo-status-bar";
import Constants from 'expo-constants';


export const ModalScreen = ({route, navigation}) => {

    let [data, setData] = useState([]);
    const { itemId } = route.params;
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getShopById(itemId)
            .then((list) => setData(list))
            .catch((e) => console.log('e:', e))
            .finally(() => setIsLoading(false))
    }, [itemId])

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
    if (isLoading || !data) {
        return (<RenderLoading />);
    }

    return (
        <>
        <StatusBar backgroundcolor='#fff' style='dark' />
        <SafeAreaView style={styles.droidSafeArea}/>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{float: 'left'}}>
                <Back style={{width: 8, height: 16, marginTop: 32, marginLeft: 18}}/>
            </TouchableOpacity>
            <View style={{display: 'flex', alignItems:'center', marginBottom: 25}}>
                <Image style={{width:70, height:70}} source={{uri: data.logo}} />
            </View>
            <ScrollView style={{flex: 1, paddingTop: 30}}>
                <View style={{
                    height: 110, backgroundColor: '#F8E94E', borderTopLeftRadius: 20,
                    borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 'bold',
                    }}>
                        {data.info.name}
                        {/*Jeffrey’s Coffeeshop*/}
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 'normal',
                        color: '#333333',
                        paddingTop: 8
                    }}>
                        {data.info.category.name}
                        {/*Кофейня*/}
                    </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{flex: 1, borderRightWidth: 1, borderRightColor:'#333333', marginTop: 10, display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between', padding: 35}}>
                        <Text style={{
                            fontSize: 34,
                            fontFamily: 'Helvetica Neue',
                            fontWeight: 'bold',
                        }}>
                            {data.info.loyalty.rightText}
                            {/*10%*/}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Helvetica Neue',
                            fontWeight: 'normal',
                            color: '#333333',
                            textAlign:'center',
                            lineHeight: 18,
                            paddingTop: 8,
                        }}>
                            {data.info.loyalty.loyaltyCategory && 'Скидка ('+data.info.loyalty.loyaltyCategory.categoryName+')'}
                        </Text>
                    </View>
                    <View style={{flex:1, display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between', padding: 35}}>
                        <Text style={{
                            fontSize: 34,
                            fontFamily: 'Helvetica Neue',
                            fontWeight: 'bold',
                        }}>
                            1500₽
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Helvetica Neue',
                            fontWeight: 'normal',
                            color: '#333333',
                            textAlign:'center',
                            lineHeight: 18,
                            paddingTop: 8,
                        }}>
                            До статуса {data.info.loyalty.loyaltyCategory ? 'Gold' : 'Basic'}
                        </Text>
                    </View>
                </View>
                <View style={{padding: 25, display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 'normal',
                        color: '#000',
                        flex:3,
                        lineHeight:20,
                        textAlign: 'left'
                    }}>
                        {data.address}
                    </Text>

                    <Text style={{
                        fontSize: 13,
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 'bold',
                        color: '#000',
                        flex:2,
                        textAlign: 'right'
                    }}>
                        м. {data.subway}
                    </Text>
                </View>

                <View style={{height:50, textAlign: 'center', backgroundColor: '#333333', justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 'bold',
                        color:'#fff',
                        fontSize: 16,
                        lineHeight: 18}}>
                        Доступные предложения
                    </Text>
                </View>

                <FlatList
                    data={data.offers}
                    ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                    renderItem={({item}) => {{
                        return (<View style={{height:60, justifyContent:'space-between', alignItems:'center', flexDirection:'row', paddingHorizontal:25}}>
                            <Text style={{
                                fontFamily: 'Helvetica Neue',
                                fontWeight: 'bold',
                                color:'#000',
                                fontSize: 14,
                                lineHeight: 18
                            }}>{item.offerType === 'AdditionalSale' ? 'Скидка '+item.salePercent+'%' : item.freePosition.title}</Text>

                            <Text style={{
                            fontFamily: 'Helvetica Neue',
                            fontWeight: 'normal',
                            color:'#000',
                            fontSize: 14,
                            lineHeight: 18
                        }}>до 17.11.2020</Text>
                        </View>)
                    }}}
                    keyExtractor={item => item.offerType+Math.random(1,53)}
                />
            </ScrollView>
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
        backgroundColor: '#fff',
        color: '#000'
    },
});

