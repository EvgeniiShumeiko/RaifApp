import Constants from 'expo-constants';
import React, {useEffect, useState} from 'react';
import {AppLoading} from 'expo';
import {useFonts} from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native';
import * as Linking from 'expo-linking';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Offers from './src/components/offers';
import Shops from './src/components/shops';
import Login from "./src/components/login";
import {getAuth} from "./src/repositories/storage";
import {TransitionPresets} from '@react-navigation/stack';
import {ModalScreen} from "./src/components/modal";
import {CartScreen} from "./src/components/cart";


const Tab = createMaterialTopTabNavigator();
const StackNavigator = createStackNavigator()
const RootStack = createStackNavigator();

const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current && navigationRef.current.navigate(name, params);
}


function MainStackScreen() {
    return (
        <>
            <StatusBar backgroundcolor='#fff' style='dark' />
            <SafeAreaView style={styles.droidSafeArea}/>
            <Tab.Navigator
                tabBarOptions={{
                    styles: {color: '#828282'},
                    activeTintColor: '#333333',
                    labelStyle: styles.navigationTabStyle,
                    indicatorStyle: {
                        backgroundColor: '#F8E94E'
                    }
                }}
            >
                <Tab.Screen name="Новые" component={Offers}/>
                <Tab.Screen name="Места" component={Shops}/>
            </Tab.Navigator>
        </>
    );
}

function RootStackScreen() {
    return (
        <RootStack.Navigator mode="modal">
            <RootStack.Screen
                name="Main"
                component={MainStackScreen}
                options={{headerShown: false}}
            />
            <RootStack.Screen name="MyModal" options={{
                headerShown: false,
                mode: 'modal',
                gestureDirection: 'vertical',
                ...TransitionPresets.ModalSlideFromBottomIOS,
            }} component={ModalScreen}/>

            <RootStack.Screen name="MyCart" options={{
                headerShown: false,
                mode: 'modal',
                gestureDirection: 'vertical',
                ...TransitionPresets.ModalSlideFromBottomIOS,
            }} component={CartScreen}/>
        </RootStack.Navigator>
    );
}

export default function App() {



    // useEffect(() => {
    //   AsyncStorage.clear();
    // }, [])


    let [fontsLoaded] = useFonts({
        'Helvetica Neue': require('./assets/fonts/HelveticaNeueCyr-Medium.ttf'),
        'Helvetica Neue Bold': require('./assets/fonts/HelveticaNeueCyr-Bold.ttf'),
    });

    let [isLogin, setLogin] = useState(false);

    if (isLogin) {
        const _handleUrl = (url) => {
            let { path, queryParams } = Linking.parse(url);
            if (queryParams.cartId) {
                let cartId = queryParams.cartId;
                navigate('MyCart', {cartId: cartId});
            }
        };

        Linking.addEventListener('url', (r) => _handleUrl(r.url))

        Linking.getInitialURL().then(r => _handleUrl(r))
    }

    useEffect(() => {
        getAuth()
            .then((data) => data.token)
            .then((token) => setLogin(token && true))
            .catch((e) => setLogin(false))
    }, []);

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {

        const update = () => {
            setLogin(true)
        };
        return (
            <NavigationContainer ref={navigationRef}>
                {isLogin ? (
                    <RootStackScreen/>
                ) : (
                    <>
                        <StatusBar backgroundcolor='#fff' style='dark'/>
                        <SafeAreaView style={styles.droidSafeArea}/>
                        <StackNavigator.Navigator>
                            <StackNavigator.Screen name="Авторизация">
                                {() => (<Login up={update}/>)}
                            </StackNavigator.Screen>
                        </StackNavigator.Navigator>
                    </>
                )
                }

            </NavigationContainer>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationTabStyle: {
        fontFamily: 'Helvetica Neue Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16
    },
    droidSafeArea: {
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
        backgroundColor: '#fff',
        color: '#000'
    },
});
