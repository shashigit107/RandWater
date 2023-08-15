import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SettingDrawer, Notification, CloseBlueIcon } from '../../assets/svgs';
import { styles } from '../../themes';
import WText from './WText';
import { useNavigation } from '@react-navigation/native';
import { StackNavStrings } from '../../navigation/NavigationKeys';
import { LeftArrowIcon } from '../../assets/svgs';
import { getNotificationcount, getNotification } from '../../redux/actions/settingsAction';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKENS, APP_OPEN, USER } from '../../common/constants';
import CustomPopup from './CustomPopup';
import {makeFlag} from '../../redux/actions/settingsAction'
import { colors } from '../../themes';



// import 
const WHeader = props => {
  const inputRef=useRef(null)
  const {popupFlag} = useSelector(state => state.settings)

  const { title,
    close = false,
    settingIcon = true,
    backIcon = false,
    menuFlag = true,
    NotificationIcon = false,
    awardedPoint = false
  } = props;
  const { notification } = useSelector(state => state.settings)
  const navigation = useNavigation();
  const dispatch = useDispatch()
  

  const onPressSettings = () => {
    if (props?.onPress) {
      props?.onPress();
    } else {
      navigation.navigate(StackNavStrings.Settings);
    }
  };
// console.log("wHeader----------------------",popupFlag)
//   useEffect(()=>{
//     if(popupFlag){
//       inputRef.current.show()
//     }
    
//   },[])

//   const closedPopup=()=>{
//     inputRef.current.close()
//     dispatch(makeFlag(false))
//   }
  

//  const popupComponent=()=>{
//     return(
//       <View style={{justifyContent:'center',alignItems:'center'}}>
//         <WText style={{color:'red', paddingBottom:10}} type={'MA14'}>NOTE</WText>
//         <WText style={{paddingBottom:10}} type={'MA16'}>hey recieve broadcast message</WText>
//         <TouchableOpacity style={{backgroundColor:colors.homeHeadingTitle, borderRadius:5, paddingHorizontal:10,paddingVertical:5}} onPress={closedPopup}>
//         <WText style={{color:'white'}} type={'MA14'}>Dismiss</WText>
//         </TouchableOpacity>
//       </View>
//     )
//  }



  useEffect(() => {
    AsyncStorage.multiGet([USER, ACCESS_TOKENS, APP_OPEN], (error, result) => {
      console.log("checkloginuser", result)
      if (result !== null) {
        let loginUser = result[0][1];
        let token = result[1][1];
        let AppOpen = result[2][1];
        if (loginUser && token) {
          dispatch(getNotificationcount())
          dispatch(getNotification())
        }
      }
    });
  }, [])

  const onPressClose = () => {
    navigation.goBack();
  };


  const moveToNotificationscren = () => {
      // console.log("-------------------")
    // dispatch(makeFlag(true))
    navigation.navigate(StackNavStrings.NotificationScreen);
  }



  return (
    <>
      <View style={localStyles.container}>
        {menuFlag ?
          <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={onPressSettings}>
            {settingIcon ?
              <SettingDrawer /> : ''
            }
            {backIcon ?
              <LeftArrowIcon /> : ''
            }
          </TouchableOpacity> : <View />
        }
       {awardedPoint?<WText style={{ marginRight:-60}} type={'MA16'}>{title}</WText>:<WText type={'MA16'}>{title}</WText>} 
       <View style={{flexDirection:'row'}}>
        {awardedPoint?<View style={{flexDirection:"column",position:"relative",  justifyContent:'center', alignItems:"center", padding:0, margin:0}}>
          {/* <WText type={'MA12'}>Awarded Points</WText> */}
          <Text style={{fontSize:8}}>Awarded Points</Text>
          <Text  style={{color:'#082c67', fontSize:14, fontWeight:"bold"}}>{notification?.data?.awarded_points}</Text>
          </View>:<></>}
        {close ? (
          <TouchableOpacity onPress={onPressClose}>
            <CloseBlueIcon />
          </TouchableOpacity>
        ) : NotificationIcon ? <TouchableOpacity style={{ padding: 10 }}
          onPress={moveToNotificationscren}
        >
          {notification && notification?.data.unread_notifications_count !== 0 ? <View style={localStyles.notificationCount}>
            <Text style={{ color: 'white', fontSize: 12 }}>{notification?.data?.unread_notifications_count}</Text>
          </View> : null}

          <Notification height={20} width={20} style={{marginBottom:-10}} />
          {/* <View></View> */}
        </TouchableOpacity> : <View></View>}
        </View>

      </View>
      {/* <CustomPopup
      component={popupComponent}
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
      

    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    ...styles.itemsCenter,
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.mh10,
    ...styles.pv10,
    paddingRight: 10
  },
  notificationCount: {
    position: 'absolute',
    zIndex: 999,
    left: 18, top: -2,
    //  borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "red"
  }
});

export default React.memo(WHeader);
