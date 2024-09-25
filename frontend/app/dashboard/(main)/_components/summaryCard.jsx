import Image from "next/image";

function SummaryCard({ title, details, icon }) {
  return (
    <div className="flex flex-col md:flex-row items-center text-center md:py-2 md:px-4 gap-2 xl:gap-4 xl:py-4 xl:px-6 bg-white border border-softGray rounded-md drop-shadow pointer-events-none">
      <div>
        <h2 className="scroll-m-20 pb-1 text-xl font-medium tracking-tight first:mt-0">
          {title}
        </h2>
        <p className="scroll-m-20 text-2xl font-bold tracking-tight">
          {details}
        </p>
      </div>

      <Image
        src={icon}
        alt="Ícone do card"
        width={0}
        height={0}
        className="bg-softGray p-3 rounded-full w-12 h-12"
      />
    </div>
  );
}

export default SummaryCard;
