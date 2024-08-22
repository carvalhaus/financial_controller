import SloganSection from "./_components/slogan";
import SummarySection from "./_components/summary";

function Homepage() {
    return (
        <main className="flex-1 px-5">
            <SloganSection />
            <SummarySection />
        </main>
    );
}

export default Homepage;