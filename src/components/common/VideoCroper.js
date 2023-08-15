

import { useState } from "react"
import {Text,View} from "react-native"
// import Trimmer from "react-native-trimmer"

const VideoCroper =({video=false})=>{
    console.log("VideoCroper",video)
    const[leftHandleChange,setLeftHandleChange]=useState(0)
    const[rightHandleChange,setRightHandleChange]=useState(0)

 const onHandleChange = ({ leftPosition, rightPosition }) => {
    setLeftHandleChange(leftPosition)
    setRightHandleChange(rightPosition)
 }
console.log("leftWrite",leftHandleChange,rightHandleChange)

    return(
        <View><Text>hey</Text>
        {/* <Trimmer
        onHandleChange={onHandleChange}
          totalDuration={60000}
          trimmerLeftHandlePosition={leftHandleChange}
          trimmerRightHandlePosition={rightHandleChange}
        /> */}
        </View>
    )
}
export default VideoCroper