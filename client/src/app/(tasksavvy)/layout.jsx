import Header from "@/components/header/page";

export default function layout ({children}){
    return(
        <>
        <Header/>
        {children}
        </>
    )
}
