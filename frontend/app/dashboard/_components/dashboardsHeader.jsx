import SidebarMobile from "./sidebarMobile";

function DashboardsHeader({ title, category, subtitle }) {
  return (
    <header className="border-b border-b-[#E2E8F0] px-10 py-5 flex flex-col items-center lg:items-start relative">
      <SidebarMobile />

      <div className="flex gap-2 text-center w-full flex-wrap justify-center">
        <h1
          className={`scroll-m-20 text-3xl font-extrabold tracking-wide text-center ${
            category && "opacity-80"
          }`}
        >
          {title}
        </h1>
        {category && (
          <>
            <p className="text-2xl">&#8594;</p>
            <p className="scroll-m-20 text-3xl font-extrabold tracking-wide">
              {category}
            </p>
          </>
        )}
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-2 text-center">
        {subtitle}
      </p>
    </header>
  );
}

export default DashboardsHeader;
