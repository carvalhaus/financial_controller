"use client";

import CategoryCard from "../../_components/categoryCard";
import AddCategory from "./addCategory";

import { useApi } from "@/contexts/contextApi";
import react from "react";

function CategoriesList() {
  const { fetchWithCredentials } = useApi();

  const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

  const [categories, setCategories] = react.useState(null);

  const fetchProtectedData = async () => {
    try {
      const protectedData = await fetchWithCredentials(
        `${BASE_URL}/api/protected`
      );

      const categoriesResponse = await fetchWithCredentials(
        `${BASE_URL}/api/categories/${protectedData.userId}`
      );

      setCategories(categoriesResponse.categories);
    } catch (err) {
      console.error("Erro inesperado:", err);
      router.push("/login");
    }
  };

  react.useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <div className="flex-1 p-4 w-full">
      <div className="flex flex-col justify-center md:flex-row md:flex-wrap gap-4 2xl:gap-5 w-full">
        <AddCategory />

        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            icon={category.icon}
            name={category.name}
            totalExpenses={category.totalExpenses}
            amount={category.amount}
            totalSpent={category.totalSpent}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
