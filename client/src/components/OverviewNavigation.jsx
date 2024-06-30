import { useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsProvider";
import IngredientsNavigation from "./IngredientsNavigation";
import ProductDetailsNavigation from "./ProductDetailsNavigation";
import WeeklyReportSidebar from "./WeeklyReportSidebar";

function OverviewNavigation() {
  const { semanaId, productIdExterno, ingredientIdExterno } = useParams();

  if (ingredientIdExterno) return <IngredientsNavigation />;

  if (productIdExterno) return <ProductDetailsNavigation />;

  if (semanaId) return <WeeklyReportSidebar />;

  return null;
}

export default OverviewNavigation;
