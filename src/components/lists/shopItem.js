import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Cafe from '../../../assets/images/shop-types/cafe.svg';
import Staff from '../../../assets/images/shop-types/staff.svg';
import Restaurant from '../../../assets/images/shop-types/restaurant.svg';

const ItemIcon = (props) => {
    switch (props.type) {
        case 'staff':
            return (<Staff style={{marginLeft: 2}}/>);
        case 'restaurant':
            return (<Restaurant style={{marginLeft: 2}}/>)
        case 'cafe':
        default:
            return (<Cafe style={{marginLeft: 2}}/>)
    }
}

const OfferType = (props) => {
    let offer = props.offer;
    if (offer.offerType === 'FreePosition') {
        return 'Бесплатно ' + offer.freePosition.title;
    } else {
        return 'Дополнительная скидка ' + offer.salePercent + '%';
    }

}


const ShopItem = (props,) => {
    let type = props.type;
    let shop = type === 'shops' ? props : props.shop;
    let offer = type === 'shops' ? props.loyalty : props.offer
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('MyModal',{
            itemId: shop.id})}>
            <View key={shop.id} style={styles.container}>
                <View style={styles.imageCircle}>
                    <ItemIcon type={shop.category.logo}/>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.headItemContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                {shop.name}
                            </Text>
                        </View>
                        {type === 'offers' && (
                            <View style={styles.additionalContainer}>
                                <Text style={styles.additionalText}>до 17.11.2020</Text>
                            </View>
                        )
                        }

                        {type === 'shops' && (
                            <View style={styles.additionalContainer}>
                                <Text
                                    style={styles.titleText}>{offer.loyaltyCategory ? (offer.loyaltyCategory.categoryType === "OrderSum" ? offer.checkSum + '₽' : offer.loyaltyCategory.categoryPercent + '%') : ''}</Text>
                            </View>
                        )}


                    </View>
                    <Text style={styles.titleDescription}>
                        {type === 'offers' && (
                            <OfferType offer={offer}/>

                        )}
                        {type === 'shops' ? (offer.nextLoyaltyCategory ? 'До следующего статуса - ' + (
                            offer.nextLoyaltyCategory.categoryType === "OrderSum" ? offer.nextLoyaltyCategory.categorySum - offer.orderSum : offer.nextLoyaltyCategory.categorySum - offer.checkSum
                        ) : '') : offer.checkSum}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ShopItem;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        height: 70,
        paddingTop: 16,
        paddingBottom: 16
    },
    imageCircle: {
        width: 32,
        height: 32,
        borderRadius: 32,
        color: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8E94E'
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 8,
        flex: 1
    },
    headItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleContainer: {
        // flex: 2,
    },
    titleText: {
        fontFamily: 'Helvetica Neue Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: -0.5,
    },
    titleDescription: {
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.5,
    },
    additionalContainer: {
        // flex: 1
    },
    additionalText: {
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: -0.5,
        textAlign: 'right'
    }
});
