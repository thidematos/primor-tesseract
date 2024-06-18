import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useExtract } from "../context/ExtractProvider";

function useCurrentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pdfTotalPages } = useExtract();

  const currentPage = Number(searchParams.get("page"));

  const isLimit = currentPage === pdfTotalPages;
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

export { useCurrentPage };
