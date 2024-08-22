import Homepage from "./(homepage)/page";
import Header from "./_components/header";
import Footer from "./_components/footer";

function WebPageLayout({ children }) {
    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            {children}
            <Footer />
        </div>)
}

export default WebPageLayout;