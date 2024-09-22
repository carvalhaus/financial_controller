"use client";

import { Button } from "@/components/ui/button";
import CategoryCard from "../../_components/categoryCard";
import DashboardsHeader from "../../_components/dashboardsHeader";
import react from "react";
import AddExpense from "../_components/addExpense";
import EditCategory from "../_components/editCategory";
import DeleteCategory from "../_components/deleteCategory";
import { ExpensesTable } from "../../_components/expensesTable";
import { ScrollArea } from "@/components/ui/scroll-area";

function CategorySelected({ params }) {
  react.useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={`Categorias`}
        category={"TESTE"}
        subtitle={"Destalhes da categoria selecionada"}
      />

      <div className="flex-1 flex flex-col p-4">
        <div className="flex gap-20 items-center justify-center">
          <div className="flex flex-col gap-4">
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

          <ScrollArea className="xl:h-[474px]">
            <ExpensesTable />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default CategorySelected;
