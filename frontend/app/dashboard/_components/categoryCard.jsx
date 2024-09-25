import { Progress } from "@/components/ui/progress";
import Image from "next/image";

function CategoryCard({ emoji, title, quantity, limit, spent, remaining }) {
  function realCurrency(value) {
    return parseFloat(value).toFixed(2).replace(".", ",");
  }

  function calculatePercentageSpent(spent, limit) {
    return (spent / limit) * 100;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-2 md:py-4 md:px-6 md:w-2/3 lg:w-96 bg-white border border-softGray rounded-md drop-shadow w-auto cursor-pointer hover:drop-shadow-lg transition duration-150 ease-out hover:ease-in">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center text-left gap-3">
          <div className="bg-softGray p-3 rounded-full md:w-14 md:h-14 items-center text-center text-xl">
            <p>{emoji}</p>
          </div>
          <div>
            <h2 className="scroll-m-20 pb-1 text-xl font-semibold tracking-tight first:mt-0">
              {title}
            </h2>
            <p className="scroll-m-20 text-lg font-medium tracking-tight">
              {quantity} itens
            </p>
          </div>
        </div>
        <p className="scroll-m-20 text-lg font-medium tracking-tight">
          R$ {realCurrency(limit)}
        </p>
      </div>

      <div className="w-full gap-2 flex flex-col">
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-medium">Gasto</p>
            <p>R$ {realCurrency(spent)}</p>
          </div>

          <div>
            <p className="font-medium">Restante</p>
            <p>R$ {realCurrency(remaining)}</p>
          </div>
        </div>

        <Progress value={calculatePercentageSpent(spent, limit)} />
      </div>
    </div>
  );
}

export default CategoryCard;
