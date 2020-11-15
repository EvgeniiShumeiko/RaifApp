import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import GlobalStyles from "../constants/GlobalStyles";
import RNPickerSelect from "react-native-picker-select";
import {getUserToken} from "../repositories/requests";
import {setAuth} from "../repositories/storage";



const Login = (props) => {
    const [selectedValue, setSelectedValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const items = [];
    for (let i = 1; i <= 50; i++) {
        items.push({label: 'User'+i, value: i})
    }

    const touch = () => {
        if (!selectedValue) {
            return alert('Пользователь не выбран!')
        }
        setIsLoading(true);
        getUserToken(selectedValue)
            .then((data) => data.session)
            .then((session) => {
                setAuth({uid: selectedValue, token: session}).then(() => {
                    // alert('OK');
                    setIsLoading(false)
                    props.up();
                })
            }).catch((e) => alert('Что-то пошло не так :('))
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <View style={GlobalStyles.page}>
            {isLoading && (<ActivityIndicator />)}
            <View style={styles.container}>
                <Text style={styles.text}>
                    Выбирай пользователя и жми на большую жёлтую кнопку
                </Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Пользователь',
                        value: null,
                    }}
                    items={items}
                    onValueChange={(value) => setSelectedValue(value)}
                    style={{ ...pickerSelectStyles }}
                    value={selectedValue}
                />

                <TouchableOpacity style={styles.toButton} onPress={touch}>
                    <Text style={styles.textButton}>
                        Жёлтая?
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    text: {
        paddingVertical: 20,
        fontFamily: 'Helvetica Neue Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    toButton: {
        paddingTop: 30,

    },
    textButton: {
        fontSize: 16,
        fontFamily: 'Helvetica Neue Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#F8E94E',
        padding: 15,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
