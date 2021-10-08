import React from "react"
import Home from "../screens/home"
import Deal from "../screens/deal"
import cate from "../screens/catagery"
import order from "../screens/order"
import setting from "../screens/setting"


export default function (Stack){
    return(
        <>
        <Stack.Screen  name="Home" component={Home} />
        <Stack.Screen  name="Deal" component={Deal} />
        <Stack.Screen  name="cate" component={cate} />
        <Stack.Screen  name="order" component={order} />
        <Stack.Screen  name="setting" component={setting} />
        </>
    )
}