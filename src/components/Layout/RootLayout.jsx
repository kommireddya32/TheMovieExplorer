import Header from "../header/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout(props){
    return(
        <div className={props.mode}>
            <Header mode={props.mode} setMode={props.setMode} current={props.current} setCurrent={props.setCurrent} inputRef={props.inputRef}/>
            <Outlet/>
            
        </div>
    )
}