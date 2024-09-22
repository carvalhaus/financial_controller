import DashboardsHeader from "../_components/dashboardsHeader";
import CategoriesList from "./_components/categoriesList";

function Categories() {
  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={"Categorias"}
        subtitle={"Aqui estão listadas todas categorias de despesas!"}
      />

      <CategoriesList />
    </div>
  );
}

export default Categories;
