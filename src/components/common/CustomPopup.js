
 import { Modal, StyleSheet, Text, View } from 'react-native'
import React, {forwardRef, useImperativeHandle, useEffect, useState } from 'react'

const CustomPopup=forwardRef(({component, 
  inputRef=false,
  transparent=true,
  conatinerStyle=false
})=>{
// console.log(component,inputRef)
const[visible,setVisible]=useState(false)
useImperativeHandle(inputRef, () => ({
     close(){
        setVisible(false)
      },
     show(){
        setVisible(true)
    }
  }));



  return (
    <View style={{justifyContent:"center",alignItems:'center'}}>
            <Modal
        animationType="fade"
        transparent={transparent}
        visible={visible}
        // customBackdrop={renderBackground}
        onRequestClose={() => {
          setVisible(close);
        }}
      > 
         <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
         {/* {component()} */}
         <View style={conatinerStyle?{...conatinerStyle}:styles.modelView}>{component()}
         

         </View>
   </View>

      </Modal>

    </View>
  )
})
export default CustomPopup

const styles = StyleSheet.create({
    modelView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 5
    }
})