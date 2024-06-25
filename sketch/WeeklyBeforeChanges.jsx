import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsProvider";
import Loader from "./Loader";
import Title from "./Title";
import { format, getWeek } from "date-fns";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faFileArrowDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useIngredients } from "../context/IngredientsProvider";
import { useWeeks } from "../context/WeeksProvider";

function WeeklyReport() {
  const { getAllProducts, products } = useProducts();

  const { getWeek, currentWeek } = useWeeks();

  const { getIngredients, ingredients } = useIngredients();

  const { semanaId } = useParams();

  useEffect(() => {
    getAllProducts();
    getWeek(semanaId);
    getIngredients();
  }, [getAllProducts, semanaId, getWeek, getIngredients]);

  if (!products || !currentWeek || !ingredients)
    return <Loader position={"col-span-7"} />;

  return (
    <div className="col-span-6 h-full py-10">
      <Header />
      <Product />
    </div>
  );
}

function Header() {
  const { currentWeek, getWeekPdfs, download } = useWeeks();

  return (
    <div className="flex w-full flex-row items-center justify-around py-5">
      <Title fontSize="text-2xl">RELATÓRIO SEMANAL</Title>
      <div className="flex flex-row items-center gap-8 font-noto text-gray-800">
        <p>VIGÊNCIA: </p>
        <p className="text-red-700">
          {format(currentWeek.intervalo.inicio, "dd MMM'. de' yyyy")}
        </p>
        <FontAwesomeIcon icon={faArrowRightLong} className="text-gray-600" />
        <p className="text-red-700">
          {format(currentWeek.intervalo.fim, "dd MMM'. de' yyyy")}
        </p>

        <FontAwesomeIcon
          className={`${download ? "animate-spin" : ""} cursor-pointer text-2xl text-blue-500`}
          icon={download ? faSpinner : faFileArrowDown}
          onClick={() => getWeekPdfs()}
        />
      </div>
    </div>
  );
}

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { sortedProducts } = useProducts();

  const { semanaId } = useParams();

  const currentProductQuery = searchParams.get("produto");

  useEffect(() => {
    if (!sortedProducts.length || currentProductQuery) return;

    setSearchParams(`produto=${sortedProducts[0].idExterno}`);
  }, [sortedProducts, currentProductQuery, setSearchParams]);

  const currentProduct =
    sortedProducts.find(
      (produto) => produto.idExterno === Number(currentProductQuery),
    ) || sortedProducts[0];

  const actualWeekIndex = currentProduct.ingredientesSemanais.findIndex(
    (semana) => semana.semana === semanaId,
  );

  const lastWeekProductInfo =
    actualWeekIndex === 0
      ? null
      : currentProduct.ingredientesSemanais[actualWeekIndex - 1];

  const actualWeek = currentProduct.ingredientesSemanais.at(actualWeekIndex);

  return (
    <div className="w-full text-center">
      <Title margin="mt-5">{currentProduct.nome}</Title>

      <div className="flex max-h-[700px] w-full flex-col items-center justify-start overflow-y-scroll font-noto text-gray-800">
        {actualWeek.macro.length > 0 && (
          <>
            <p className="w-full border-b border-gray-300 py-5 text-lg">
              MACRO
            </p>
            {actualWeek.macro?.map((insumo) => (
              <Insumo
                key={insumo.insumo}
                insumo={insumo}
                type={"macro"}
                lastWeekProduct={
                  lastWeekProductInfo ? lastWeekProductInfo : null
                }
              />
            ))}
          </>
        )}

        {actualWeek.micro.length > 0 && (
          <>
            <p className="w-full border-b border-gray-300 py-5 text-lg">
              MICRO
            </p>
            {actualWeek.micro.map((insumo) => (
              <Insumo
                key={insumo.insumo}
                insumo={insumo}
                type={"micro"}
                lastWeekProduct={
                  lastWeekProductInfo ? lastWeekProductInfo : null
                }
              />
            ))}
          </>
        )}

        {actualWeek.outros.length > 0 && (
          <>
            <p className="w-full border-b border-gray-300 py-5 text-lg">
              OUTROS
            </p>
            {actualWeek.outros.map((insumo) => (
              <Insumo
                key={insumo.insumo}
                insumo={insumo}
                type={"outros"}
                lastWeekProduct={
                  lastWeekProductInfo ? lastWeekProductInfo : null
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Insumo({ insumo, lastWeekProduct, type }) {
  const { ingredients, numberToPriceString } = useIngredients();

  if (ingredients.length === 0) return null;

  const currentIngredient = ingredients.find(
    (ingredient) => ingredient._id === insumo.insumo,
  );

  const lastWeekIngredientInfo = currentIngredient.precoSemana.find(
    (semana) => semana.semana._id === lastWeekProduct?.semana,
  );

  const lastWeekUsedWeight =
    lastWeekProduct?.[type].find(
      (macroEl) => macroEl.insumo === currentIngredient._id,
    )?.qtdBatidaMil || " - ";

  return (
    <div className="grid w-full grid-cols-7 items-center border-b border-gray-300 py-4">
      <p className="col-span-1 text-base">{currentIngredient.nome}</p>
      {/*LAST WEEK*/}
      {lastWeekProduct === null && (
        <p className="col-span-3 text-base">
          Não há dados para a semana anterior.
        </p>
      )}
      {lastWeekProduct && (
        <>
          <p className="col-span-1 text-base">{lastWeekUsedWeight} KG</p>
          <p className="col-span-1 text-base">
            {numberToPriceString(lastWeekIngredientInfo.preco)}
          </p>
          <p className="col-span-1 border-r border-gray-400 text-base">
            {numberToPriceString(
              lastWeekUsedWeight * lastWeekIngredientInfo.preco,
            )}
          </p>
        </>
      )}

      {/*CURRENT WEEK*/}
      <p className="col-span-1 text-base">{insumo.qtdBatidaMil} KG</p>
      <p className="col-span-1 text-base">
        {numberToPriceString(insumo.weeklyPreco)}
      </p>
      <p className="col-span-1 text-base">
        {numberToPriceString(insumo.qtdBatidaMil * insumo.weeklyPreco)}
      </p>
    </div>
  );
}

export default WeeklyReport;
