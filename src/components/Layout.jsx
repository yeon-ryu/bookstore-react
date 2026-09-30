import "@/css/Input.css"
import "@/css/Page.css"
import "@/css/Book.css"
import Header from "./Header";

export default function Layout ({children}) {

    return <>
        <Header />
        {children}
    </>
}