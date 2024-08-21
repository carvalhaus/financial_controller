import Homepage from "./page";
import Header from "./_components/header";
import Footer from "./_components/footer";

function WebPageLayout() {
    return (
        <div className="flex flex-col w-screen h-screen">
            <Header />
            <Homepage />
            <Footer />
        </div>)
}

export default WebPageLayout;