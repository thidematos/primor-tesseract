import { useEffect, useRef, useState } from "react";
import Title from "../utils/Title";
import { useExtract } from "../context/ExtractProvider";
import { useIngredients } from "../context/IngredientsProvider";
import Loader from "../utils/Loader";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function NewReportForm() {
  const {
    status: statusIngredients,
    getIngredients,
    currentInput,
    ingredientsSorted,
  } = useIngredients();
  const { status: statusPDF } = useExtract();

  useEffect(() => {
    function handler(e) {
      if (e.code !== "Enter") return;
      console.log(e);
      currentInput.setter((state) => {
        return state !== ingredientsSorted.length - 1 ? state + 1 : 0;
      });
    }

    function arrowHandler(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        currentInput.setter((state) => {
          if (e.key === "ArrowUp") {
            return state !== 0 ? state - 1 : ingredientsSorted.length - 1;
          } else {
            return state !== ingredientsSorted.length - 1 ? state + 1 : 0;
          }
        });
      }

      return;
    }

    window.addEventListener("keypress", handler);
    window.addEventListener("keydown", arrowHandler);

    return () => {
      window.removeEventListener("keypress", handler);
      window.removeEventListener("keydown", arrowHandler);
    };
  }, [currentInput, ingredientsSorted]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  if (statusPDF === "loading") return <Loader position={"col-span-5"} />;

  if (statusIngredients === "loading")
    return <Loader position={"col-span-5"} />;

  return (
    <div className="col-span-5 grid h-full overflow-y-hidden py-[5%]">
      <TitleAndDate />
      <IngredientsList />
    </div>
  );
}

function TitleAndDate() {
  const { dispatch } = useIngredients();

  function dateParser(dateString) {
    const [year, month, day] = dateString.split("-");

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  return (
    <div className="row-span-1 flex flex-row items-center justify-evenly pb-6 text-center">
      <Title fontSize="text-2xl">RELATÓRIO SEMANAL</Title>

      <input
        type="date"
        onChange={(e) =>
          dispatch({
            type: "changeOnWeek",
            payload: {
              start: dateParser(e.target.value),
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
              end: dateParser(e.target.value),
            },
          })
        }
      />
    </div>
  );
}

function IngredientsList() {
  const { ingredients, ingredientsSorted } = useIngredients();

  if (!ingredients.length) return null;

  return (
    <div
      style={{ gridTemplateRows: ingredients.length + 1 }}
      className="row-span-12 grid w-full overflow-y-scroll"
    >
      <TableHeader />
      {ingredientsSorted.map((ingredient) => (
        <TableRow key={ingredient.idExterno} ingredient={ingredient} />
      ))}
    </div>
  );
}

function TableRow({ ingredient }) {
  return (
    <div className="row-span-1 grid grid-cols-12 justify-center border-b border-gray-300 font-noto text-gray-800">
      <InsumoInfo ingredient={ingredient} />

      <InsumoOldPrice ingredient={ingredient} />

      <InsumoNewPrice ingredient={ingredient} />
    </div>
  );
}

function InsumoInfo({ ingredient }) {
  return (
    <div className="col-span-4 flex flex-row items-center justify-start border-r border-gray-300 py-6 pl-6">
      <p className="w-10 text-orange-500">{ingredient.idExterno}</p>
      <span className="mx-2">|</span>
      <p className="w-full">{ingredient.nome}</p>
    </div>
  );
}

function InsumoOldPrice({ ingredient }) {
  const { handleChangePreco } = useIngredients();

  return (
    <div className="col-span-4 grid grid-cols-3 items-center border-r border-gray-300 py-6">
      <p className="col-span-1 text-center">
        <span>R$ </span>
        <span className="text-red-700">
          {String(ingredient.precoSemana.at(-1).preco.toFixed(3)).replace(
            ".",
            ",",
          )}
        </span>
      </p>
      <p className="col-span-1 text-center text-sm">
        {format(
          ingredient.precoSemana.at(-1).semana.intervalo.inicio,
          "dd MMM'. de' yyyy",
        )}
      </p>
      <div className="col-span-1 flex flex-row justify-center">
        <button
          onClick={() =>
            handleChangePreco(ingredient, ingredient.precoSemana.at(-1).preco)
          }
        >
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            className="text-xl text-blue-500 drop-shadow"
          />
        </button>
      </div>
    </div>
  );
}

function InsumoNewPrice({ ingredient }) {
  const { getPreco, handleChangePreco, currentInput, ingredientsSorted } =
    useIngredients();

  const inputRef = useRef(null);

  useEffect(() => {
    if (
      ingredient.idExterno !== ingredientsSorted[currentInput.state].idExterno
    )
      return;

    inputRef.current.focus({ preventScroll: true });
  });

  return (
    <div className="col-span-4 row-span-1 flex flex-row items-center justify-center py-6">
      <input
        type="number"
        ref={inputRef}
        id={ingredient.idExterno}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
          }
        }}
        onFocus={() =>
          currentInput.setter(
            ingredientsSorted.findIndex(
              (el) => el.idExterno === ingredient.idExterno,
            ),
          )
        }
        className={`rounded border border-gray-300 p-2 text-start text-gray-600 shadow-sm outline-none duration-150 focus:border-blue-500 focus:text-gray-700`}
        min={0}
        value={getPreco(ingredient)}
        onChange={(e) => handleChangePreco(ingredient, e.target.value)}
      />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="row-span-1 grid grid-cols-12 gap-x-10 font-montserrat text-lg text-gray-500 drop-shadow-sm">
      <p className="col-span-4 self-center text-center">INSUMO</p>
      <p className="col-span-4 self-center text-center">PREÇO PASSADO</p>
      <p className="col-span-4 self-center text-center">PREÇO ATUAL</p>
    </div>
  );
}

export default NewReportForm;
