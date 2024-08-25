function DashboardsHeader({ title, subtitle }) {
    return (
        <header className="border-b border-b-[#E2E8F0] px-10 py-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide">
                {title}
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
                {subtitle}
            </p>
        </header>
    );
}

export default DashboardsHeader;