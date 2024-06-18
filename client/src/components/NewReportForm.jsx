import { useEffect, useState } from "react";
import Title from "../utils/Title";
import UploadPDF from "./UploadPDF";
import { useExtract } from "../context/ExtractProvider";
import { useIngredients } from "../context/IngredientsProvider";
import { useIngredientPagination } from "../hooks/useIngredientPagination";

function NewReportForm() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [uploadedPDF, setUploadedPDF] = useState(null);

  const { extractPDFData, dispatch } = useExtract();

  const { ingredients, getIngredients } = useIngredients();

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <div className="markup col-span-5 flex h-full flex-col items-center justify-start overflow-y-scroll p-[5%]">
      <Title fontSize="text-2xl">RELATÓRIO SEMANAL</Title>
      <IngredientsList />
      <Pagination />
    </div>
  );
}

function IngredientsList() {
  const { ingredients } = useIngredients();

  const [currentPage, setCurrentPage] = useIngredientPagination();

  if (!ingredients.length) return null;

  const currentItems = ingredients.slice(
    currentPage * 20 - 19,
    currentPage * 20 + 1,
  );

  return (
    <div className="grid grid-cols-4 gap-10">
      {currentItems.map((ingredient) => (
        <p key={ingredient.idExterno}>
          {String(ingredient.idExterno).padStart(4, "0")} | {ingredient.nome}
        </p>
      ))}
    </div>
  );
}

function Pagination() {
  const { ingredients } = useIngredients();
  const [currentPage, setCurrentPage] = useIngredientPagination();

  if (!ingredients) return null;

  const pages = Array.from(
    { length: Math.ceil(ingredients.length / 20) },
    (_, ind) => ind + 1,
  );

  return (
    <ul className="flex flex-row items-center justify-center gap-6">
      {pages.map((page) => (
        <li
          className={`${Number(currentPage) === page ? "text-xl text-blue-500" : ""} cursor-pointer`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
}
export default NewReportForm;
