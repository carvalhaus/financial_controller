"use client";

import CategoryCard from "../../_components/categoryCard";
import DashboardsHeader from "../../_components/dashboardsHeader";
import react from "react";
import AddExpense from "../_components/addExpense";
import EditCategory from "../_components/editCategory";
import DeleteCategory from "../_components/deleteCategory";
import { ExpensesTable } from "../../_components/expensesTable";
import { ScrollArea } from "@/components/ui/scroll-area";

function CategorySelected({ params }) {
  const [windowDimensions, setWindowDimensions] = react.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        category={"TESTE"}
        subtitle={"Destalhes da categoria selecionada"}
      />

      <div className="flex-1 flex flex-col p-4 gap-10 md:gap-0">
        <div className="flex flex-col md:flex-row gap-6 md:gap-20 items-center justify-center">
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <CategoryCard />
            <div className="flex gap-4">
              <DeleteCategory />
              <EditCategory />
            </div>
          </div>

          <AddExpense />
        </div>

        <div className="py-4 text-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Últimos lançamentos
          </h3>

          <ScrollArea
            className="rounded-md"
            style={{ height: `${windowDimensions.height - 520}px` }}
          >
            <ExpensesTable />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default CategorySelected;
