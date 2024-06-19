import { useEffect, useState } from "react";
import Title from "../utils/Title";
import { useExtract } from "../context/ExtractProvider";
import { useIngredients } from "../context/IngredientsProvider";
import { useIngredientPagination } from "../hooks/useIngredientPagination";
import Loader from "../utils/Loader";

function NewReportForm() {
  const { statusIngredients, getIngredients } = useIngredients();
  const { statusPDF } = useExtract();

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <div className="grid-rows-14 col-span-5 grid h-full overflow-y-hidden py-[5%]">
      {statusPDF === "loading" && <Loader />}
      {statusIngredients === "loading" && <Loader />}
      {statusPDF === "ready" && statusIngredients === "ready" && (
        <>
          <TitleAndDate />
          <IngredientsList />
          <Pagination />
        </>
      )}
    </div>
  );
}

function TitleAndDate() {
  const { dispatch } = useIngredients();

  return (
    <div className="row-span-1 flex flex-row items-center justify-evenly pb-6 text-center">
      <Title fontSize="text-2xl">RELATÓRIO SEMANAL</Title>
      <input
        type="date"
        onChange={(e) =>
          dispatch({
            type: "changeOnWeek",
            payload: {
              start: new Date(e.target.value),
            },
          })
        }
      />
      <input
        type="date"
        onChange={(e) =>
          dispatch({
            type: "changeOnWeek",
            payload: {
              end: new Date(e.target.value),
            },
          })
        }
      />
    </div>
  );
}

function IngredientsList() {
  const { ingredients, ingredientsSorted, getPreco, handleChangePreco } =
    useIngredients();

  const [currentPage, setCurrentPage, startIndex, endIndex] =
    useIngredientPagination(16);

  const currentItems = ingredientsSorted.slice(startIndex, endIndex);

  if (!ingredients.length) return null;

  return (
    <div className="row-span-12 grid w-full grid-cols-4">
      {currentItems.map((ingredient) => (
        <div
          key={ingredient.idExterno}
          className="flex flex-col items-start justify-center gap-3 border border-gray-300 p-10"
        >
          <p className="font-noto tracking-wider">
            <span className="text-orange-500">
              {String(ingredient.idExterno).padStart(4, "0")}
            </span>{" "}
            | <span className="text-gray-800">{ingredient.nome}</span>
          </p>
          <div className="flex w-full flex-row items-center justify-start gap-2 font-montserrat text-sm">
            <label>Preço</label>
            <input
              type="number"
              step={0.001}
              className={`${!getPreco(ingredient) ? `border border-gray-300 text-gray-400` : `border border-blue-500 text-gray-700`} w-[50%] rounded p-2 text-end shadow-sm outline-none duration-150`}
              min={0}
              value={getPreco(ingredient)}
              onChange={(e) => handleChangePreco(ingredient, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Pagination() {
  const { ingredients } = useIngredients();
  const [currentPage, setCurrentPage] = useIngredientPagination();

  if (!ingredients) return null;

  const pages = Array.from(
    { length: Math.ceil(ingredients.length / 16) },
    (_, ind) => ind + 1,
  );

  return (
    <ul className="row-span-1 flex flex-row items-center justify-center gap-6 pt-6">
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
