import "@/css/Input.css"
import "@/css/Page.css"
import "@/css/Book.css"
import Header from "./Header";
import TabBar from "@/tab/TabBar";
import TabContet from "@/tab/TabContent";
import { BrowserRouter } from "react-router-dom";
import { TabRouterSync } from "@/tab/TabRouterSync";

export default function Layout ({children}) {

    return <BrowserRouter>
        <Header />
        <TabRouterSync />
        <TabBar />
        <TabContet />
        {/* {children} */}
    </BrowserRouter>
}