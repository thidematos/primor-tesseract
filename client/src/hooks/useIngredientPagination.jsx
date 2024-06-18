import { useSearchParams } from "react-router-dom";
import { useIngredients } from "../context/IngredientsProvider";

function useIngredientPagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { ingredients } = useIngredients();

  const currentPage = searchParams.get("page");

  if (ingredients.length && !currentPage) {
    setSearchParams("page=1");
  }

  function setCurrentPage(page) {
    setSearchParams(`page=${page}`);
  }

  return [currentPage, setCurrentPage];
}

export { useIngredientPagination };
