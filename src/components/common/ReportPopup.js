import { Modal, StyleSheet, Text, View, TouchableOpacity, Animated, Pressable } from 'react-native'
import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setReportfocus } from '../../redux/actions/home'
import { useNavigation } from '@react-navigation/native'

import { Add, WaterInvestigationComplete, WaterInprogress } from '../../assets/svgs';
import { StackNavStrings } from '../../navigation/NavigationKeys';

const ReportPopup = () => {
  const [animated, setAnimationActive] = useState(false)
  const navigation = useNavigation();

  const { reportFocus } = useSelector(state => state.home);
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      if (!reportFocus) {
        setAnimationActive(false)
      } else {
        setAnimationActive(true)
      }
    }, 100)

  }, [reportFocus])


  const animation = useRef(new Animated.Value(0)).current;
  let toValue = reportFocus ? 1 : 0;
  Animated.spring(animation, {
    toValue,
    friction: 5,
    useNativeDriver: true
  }).start();

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },

    ],
  }

  const button1Style = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -110]
        })
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -90]
        })
      }
    ]
  }
  const button2Style = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 110]
        }
        )
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -90]
        })
      }
    ]
  }
  const toViewScreen = () => {
    navigation.navigate("Reports")
  }

  const ToNewIncident = () => {
    navigation.navigate("ReportScreen")
  }

  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={animated}
      // onRequestClose={() => {
      //   setModalVisible(reportFocus);
      // }}
      >
        <View style={styles.conteredView2}>
          <View style={styles.modalView}>
            <TouchableOpacity activeOpacity={.5} onPress={toViewScreen} style={{ justifyContent: "center", alignItems: 'center', position: 'absolute' }}>
              <Animated.View style={[{ justifyContent: "center", alignItems: 'center' }, button1Style]}>
                <View style={{
                  justifyContent: "center", alignItems: 'center', backgroundColor: 'white',
                  height: 60, width: 60, borderRadius: 30, padding: 10
                }}>
                  <WaterInvestigationComplete />
                  {/* <Text style={{}}>Icon</Text> */}
                </View>
                <Text style={{ paddingTop: 20, color: 'white' }} >View Report</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={.5} onPress={ToNewIncident} style={{ justifyContent: "center", alignItems: 'center', position: 'absolute' }}>
              <Animated.View style={[{ justifyContent: "center", alignItems: 'center' }, button2Style]}>

                <View style={{
                  justifyContent: "center", alignItems: 'center', backgroundColor: 'white',
                  height: 60, width: 60, borderRadius: 30, padding: 10
                }}>
                  <WaterInvestigationComplete />
                </View>

                <Text style={{ paddingTop: 20, color: 'white' }}>Add New Incident</Text>
              </Animated.View>

            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[rotation]}
              onPress={() => dispatch(setReportfocus(false))}
            >
              <Add />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  )
}
export default ReportPopup

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    // width:"100%",
    justifyContent: "center",
    alignItems: 'center',
    // marginTop: "100%",
  },
  conteredView2: {
    flex: 1, justifyContent: "flex-end", alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    // paddingTop:"50%",
    // marginTop: 693,
    // margin:'80%',

    // alignSelf: 'flex-end
    // margin: 20,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    // borderRadius: 20,
    // padding: 35,
    paddingBottom: "14%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  // buttonClose: {
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  // },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modelView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5
  }
})