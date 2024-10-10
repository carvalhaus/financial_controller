"use client";

import CategoryCard from "../../_components/categoryCard";
import DashboardsHeader from "../../_components/dashboardsHeader";
import react from "react";
import AddExpense from "../_components/addExpense";
import EditCategory from "../_components/editCategory";
import DeleteCategory from "../_components/deleteCategory";
import { ExpensesTable } from "../../_components/expensesTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApi } from "@/contexts/contextApi";
import { useRouter } from "next/navigation";

function CategorySelected({ params }) {
  const [windowDimensions, setWindowDimensions] = react.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [category, setCategory] = react.useState(null);

  const { fetchWithCredentials } = useApi();

  const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

  const router = useRouter();

  const { id } = params;

  const fetchProtectedData = async () => {
    try {
      const categoryResponse = await fetchWithCredentials(
        `${BASE_URL}/api/categories/category/${id}`
      );

      setCategory(categoryResponse.category);
    } catch (err) {
      console.error("Erro inesperado:", err);
      router.push("/login");
    }
  };

  react.useEffect(() => {
    fetchProtectedData();
  }, []);

  react.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={`Categorias`}
        category={category?.name}
        subtitle={"Destalhes da categoria selecionada"}
      />

      <div className="flex-1 flex flex-col p-4 gap-10 lg:gap-0">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-20 items-center justify-center">
          <div className="flex flex-col items-center gap-4 w-full lg:w-1/3">
            <CategoryCard
              key={category?.id}
              id={category?.id}
              icon={category?.icon}
              name={category?.name}
              totalExpenses={category?.totalExpenses}
              amount={category?.amount}
              totalSpent={category?.totalSpent}
            />

            <div className="flex gap-4 md:w-2/3">
              <DeleteCategory id={id} />
              <EditCategory
                category={category}
                fetchProtectedData={fetchProtectedData}
              />
            </div>
          </div>

          <AddExpense id={id} fetchProtectedData={fetchProtectedData} />
        </div>

        <div className="py-4 text-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Últimos lançamentos
          </h3>

          <ScrollArea
            className="rounded-md"
            style={{ height: `${windowDimensions.height - 520}px` }}
          >
            <ExpensesTable expenses={category?.Expense} fetchProtectedData={fetchProtectedData}/>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default CategorySelected;
