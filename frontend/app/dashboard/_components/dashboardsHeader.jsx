function DashboardsHeader({ title, category, subtitle }) {
  return (
    <header className="border-b border-b-[#E2E8F0] px-10 py-5">
      <div className="flex gap-2">
        <h1
          className={`scroll-m-20 text-3xl font-extrabold tracking-wide ${
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
      <p className="leading-7 [&:not(:first-child)]:mt-2">{subtitle}</p>
    </header>
  );
}

export default DashboardsHeader;
