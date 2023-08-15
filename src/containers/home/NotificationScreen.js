//-------------reactNative import--------------
import React,{useEffect, useRef} from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Alert,
  Platform
  
} from "react-native";

//--------------Library Import-------------------
import FastImage from "react-native-fast-image";
import { StackNavStrings } from "../../navigation/NavigationKeys";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//--------------Reusable Component Import---------
import WHeader from "../../components/common/WHeader";
import images from "../../assets/images";
import { colors, } from "../../themes";
import { getHeight } from "../../common/constants";
import { moderateScale } from "../../common/constants";
import WText from "../../components/common/WText";
import CustomPopup from "../../components/common/CustomPopup";
import { broadcastNotificationFlag } from "../../redux/actions/settingsAction";

//-------------Component Constatnt----------------
const { width, height } = Dimensions.get("window")


const NotificationScreen = (props) => {
  const { notification } = useSelector(state => state.settings)
  const { notificationDetail } = useSelector(state => state.settings)
  const {popupFlag} = useSelector(state => state.settings)
  const {broadCastFlag} = useSelector(state => state.settings)
  const { data = [] } = notificationDetail
  // console.log("notification----------",data)
  // const inputRef=useRef(null)
  const dispatch=useDispatch()
  const onPressBack = () => {
    navigation.navigate("Home")
  };
  const onPressEvent = () => {
    props.navigation.navigate(StackNavStrings.Reports)
  }

   useEffect(()=>{
    console.log("broadCastFlag--------notification12345",broadCastFlag[0],broadCastFlag[1])
    if(broadCastFlag[0]){
      // console.log("broadCastFlag--------2",broadCastFlag)
      // inputRef.current.show()
      Alert.alert('Rand Water', broadCastFlag[1], [
        {
          text: 'Dismiss',
          onPress: () => dispatch(broadcastNotificationFlag(false,'')),
          style: 'cancel',
        },
        // {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
   
  },[])
 
  // const closedPopup=()=>{
  //   inputRef.current.close()
  //   dispatch(broadcastNotificationFlag(false))
  // }
  // const component=()=>{
  //     return(
  //       <View style={{justifyContent:'center',alignItems:'center'}}>
  //       <WText style={{ paddingBottom:10,  fontWeight: '800',fontSize:18}} >Rand Water</WText>
  //       <WText style={{paddingBottom:10,}} type={'MA16'}>hey recieve broadcast message</WText>
  //       <TouchableOpacity style={{backgroundColor:colors.homeHeadingTitle, borderRadius:5, paddingHorizontal:10,paddingVertical:5}} onPress={closedPopup}>
  //       <WText style={{color:'white'}} type={'MA14'}>Dismiss</WText>
  //       </TouchableOpacity>
  //     </View>
  //     )
  // }

//--------- Notification Component return -------------
  return (
    <SafeAreaView style={styles.mainContainer}>
      <WHeader backIcon={true} settingIcon={false} onPress={onPressBack} title={`Notification(${notification?.data?.unread_notifications_count})`} />
      <FastImage source={images.tutorial1} style={styles.innerContainer}>
        
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          {
            data.map((element, index) => {
              return (
                <TouchableOpacity onPress={onPressEvent} style={[styles.notificationCard,element?.is_read==1?{backgroundColor: 'rgba(255, 255, 255, 0.70)'}:{backgroundColor: 'rgba(255, 255, 255, 0.90)'}]}>
                  <View style={styles.cardInsideConent}>
                    <WText
                      // type={'BB14'}
                      color={{}}
                      style={[Platform.OS == 'android'?{fontWeight:"600", fontSize:15 }:{fontFamily: 'Optima-Bold',fontSize:14}, ]}>
                      {element.description}
                    </WText>
                    <View style={{ flexDirection: "row" }}>
                      <WText
                        // type={'BB15'}
                        color={{}}
                        style={[Platform.OS == 'android'?{fontWeight:"600", fontSize:15 }:{fontFamily: 'Optima-Bold',fontSize:14}, ]}>

                        
                        {"Date : "}
                      </WText>
                      <WText
                        color={{}}
                        style={{}}>
                        {/* {element.created_date} */}
                        {moment(element.created_date).format('MMM DD YYYY [at] hh:mm a')}
                      </WText>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        {/* <CustomPopup
        component={component}
        inputRef={inputRef}
        transparent={true}
        conatinerStyle={{margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          paddingHorizontal:20,
          paddingVertical:15,
          alignItems: "center",
          shadowColor: "#000",
          elevation: 5}}
      
        /> */}
      </FastImage>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.colorWhite,
    flex: 1
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20
  },
  container: {
    paddingBottom: getHeight(150),
  },
  notificationCard: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.80)',
    marginHorizontal: moderateScale(20),
    height: moderateScale(72),
    width: width - moderateScale(40),
    padding: 10,

    borderRadius: moderateScale(12),
    paddingTop: 10
  },
  cardInsideConent: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
//rgba(255, 255, 255, 0.80)

export default NotificationScreen