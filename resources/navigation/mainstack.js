import React from "react"
import Home from "../screens/home"
import Deal from "../screens/Deal/deal"
import cate from "../screens/Catergory/catagery"
import order from "../screens/Order/order"
import setting from "../screens/Setting/setting"


export default function (Stack,options){
    return(
        <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen  name="Deal" component={Deal} />
        <Stack.Screen  name="cate" component={cate} />
        <Stack.Screen  name="order" component={order} />
        <Stack.Screen  name="setting" component={setting} />
        </>
    )
}