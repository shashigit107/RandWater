import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import WHeader from '../../components/common/WHeader';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import {
  EncroachmentsDark, User, Vacancies, Tenders
} from '../../assets/svgs';
import { colors, styles } from '../../themes';
import WText from '../../components/common/WText';
import { urls } from '../../utils/urls';

const options = [
  { name: 'Customer Self Service', url: urls.CUSTOMER_URL, icon: <User/> },
  { name: 'Rand Water Vacancies', url: urls.VIEW_VACANCIES, icon: <Vacancies /> },
  { name: 'Available Tenders', url: urls.AVAILABLE_TENDERS, icon: <Tenders /> },
];

const ConnectTab = () => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader title={'Connect'} close />
      <FastImage source={images.tutorial1} style={localStyles.innerContainer}>
        <View style={localStyles.textContainer}>
          <WText
            color={colors.placeHolder}
            style={localStyles.titleText}>
            {'Connect to'}
          </WText>
          <WText
            color={colors.placeHolder}
            style={localStyles.titleText}>
            {'Rand Water'}
          </WText>
        </View>
        <View style={localStyles.card}>
          {options.map((item, index) => {
            return (
              // <View style={{justifyContent:"center",alignItems:'center'}}>

             
              <TouchableOpacity key={index} style={localStyles.cardItem} onPress={() => navigation.navigate('Webview', {url: item.url})}>
                {item.icon}
                <WText
                  // type={'MA16'}
                  color={colors.placeHolder}
                  style={localStyles.optionText}>
                  {item.name}
                </WText>
              </TouchableOpacity>
              // </View>
            )
            
          })}
        </View>
      </FastImage>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  innerContainer: {
    ...styles.flex,
    ...styles.pt20,
    ...styles.ph20,
    ...styles.itemsCenter,
  },
  textContainer: {
    ...styles.mv20,
  },
  titleText: {
    textAlign: 'center',
    letterSpacing: 1.5,
    fontFamily: 'Poppins-Medium',
    fontSize: 26
  },
  card: {
    // flex:1,
    ...styles.mt15,
    backgroundColor: colors.colorWhite,
    height: 285,
    width: '92%',
    borderRadius: 10,
    ...styles.p15
  },
  cardItem: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#8CD3FF',
    ...styles.mv10,
    ...styles.ph10,
    height: 65,
    backgroundColor: '#e6f3f8',
    flexDirection: 'row', alignItems: 'center'
  },
  optionText: {
    ...styles.ml10,
    fontFamily:'Poppins-Medium',
    fontSize:12,
    // letterSpacing: 1
  },
});

export default ConnectTab;
