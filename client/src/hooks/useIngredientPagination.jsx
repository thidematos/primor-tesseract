import { useSearchParams } from "react-router-dom";
import { useIngredients } from "../context/IngredientsProvider";

function useIngredientPagination(itemsPerPage) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { ingredients } = useIngredients();

  const currentPage = searchParams.get("page") || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  function setCurrentPage(page) {
    setSearchParams(`page=${page}`);
  }

  return [currentPage, setCurrentPage, startIndex, endIndex];
}

export { useIngredientPagination };
