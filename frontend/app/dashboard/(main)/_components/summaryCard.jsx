import Image from "next/image";

function SummaryCard({ title, details, icon }) {
    return (
        <div className="flex items-center text-center gap-4 py-4 px-6 bg-white border border-softGray rounded-md drop-shadow pointer-events-none">
            <div>
                <h2 className="scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0">{title}</h2>
                <p className="scroll-m-20 text-2xl font-medium tracking-tight">{details}</p>
            </div>

            <Image src={icon} alt="Ícone do card" width={0} height={0} className="bg-softGray p-3 rounded-full w-14 h-14" />
        </div>
    );
}

export default SummaryCard;