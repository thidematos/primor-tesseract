import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useExtract } from "../context/ExtractProvider";
import { useProducts } from "../context/ProductsProvider";

function useProductPagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const currentPage = Number(searchParams.get("page")) || 1;

  const isLimit = currentPage === products.length;
  const isMinimum = currentPage === 1;

  const setCurrentPage = useCallback(
    (page) => setSearchParams(`page=${page}`),
    [setSearchParams],
  );

  const currentPageZeroBased = currentPage - 1;

  return {
    currentPage,
    setCurrentPage,
    isLimit,
    isMinimum,
    currentPageZeroBased,
  };
}

export { useProductPagination };
