import { Link, useParams } from "react-router-dom";
import { useIngredients } from "../context/IngredientsProvider";
import { useProducts } from "../context/ProductsProvider";
import { useWeeks } from "../context/WeeksProvider";
import { useEffect, useState } from "react";
import Title from "../utils/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

function ProductDetailsNavigation() {
  const { ingredients, getIngredients } = useIngredients();
  const { products } = useProducts();
  const { productIdExterno } = useParams();
  const { weeks } = useWeeks();

  const [selectedWeeks, setSelectedWeeks] = useState([]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  if (!ingredients.length || !products || !weeks) return null;

  const currentProduct = products.find(
    (el) => el.idExterno === Number(productIdExterno),
  );

  const weeksList = currentProduct.ingredientesSemanais
    .map((el) => el.semana)
    .map((id) => {
      return {
        date: weeks.find((week) => week._id === id).intervalo.fim,
        id: id,
      };
    });

  return (
    <div className="col-span-2 flex h-[600px] flex-col items-center justify-start self-center overflow-y-scroll">
      <Title
        fontSize="text-lg text-red-600 drop-shadow-sm"
        gridProperty="text-start"
      >
        Insumos usados:
      </Title>
      {weeksList.map((weekObj) => {
        const isSelected = selectedWeeks.includes(weekObj.date);

        const ingredientsForTheWeek = currentProduct.ingredientesSemanais.find(
          (el) => el.semana === weekObj.id,
        );

        return (
          <div
            className="flex w-[70%] flex-col items-start justify-center font-montserrat text-gray-700"
            key={weekObj.id}
          >
            <button
              onClick={() =>
                setSelectedWeeks((state) =>
                  state.includes(weekObj.date)
                    ? state.filter((el) => el !== weekObj.date)
                    : [...state, weekObj.date],
                )
              }
              className="mt-5 flex flex-row items-center justify-center gap-3"
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                rotation={isSelected ? 90 : 0}
                className={`${isSelected ? "text-blue-600" : "text-orange-600"} text-xl drop-shadow-xl duration-200`}
              />{" "}
              <span
                className={`${isSelected ? "text-blue-500 underline underline-offset-4" : ""} text-lg`}
              >
                {format(weekObj.date, "dd/MM/yyyy")}
              </span>
            </button>
            <SegmentBreadcrumb
              ingredientsForTheWeek={ingredientsForTheWeek}
              segment={"macro"}
              isSelected={isSelected}
            />
            <SegmentBreadcrumb
              ingredientsForTheWeek={ingredientsForTheWeek}
              segment={"micro"}
              isSelected={isSelected}
            />
            <SegmentBreadcrumb
              ingredientsForTheWeek={ingredientsForTheWeek}
              segment={"outros"}
              isSelected={isSelected}
            />
          </div>
        );
      })}
    </div>
  );
}

function SegmentBreadcrumb({ ingredientsForTheWeek, segment, isSelected }) {
  const [selectedSegment, setSelectedSegment] = useState([]);

  if (!ingredientsForTheWeek[segment].length) return null;

  return (
    <ul
      className={`${isSelected ? "visible h-auto opacity-100" : "collapse h-0 opacity-0"} mt-3 pl-6 duration-200`}
    >
      <button
        className="flex flex-row items-center gap-2"
        onClick={() => {
          setSelectedSegment((state) =>
            state.includes(segment)
              ? state.filter((el) => el !== segment)
              : [...state, segment],
          );
        }}
      >
        <FontAwesomeIcon
          icon={faCaretRight}
          rotation={selectedSegment.includes(segment) ? 90 : 0}
          className={`${selectedSegment.includes(segment) ? "text-blue-600" : "text-orange-600"} text-xl drop-shadow-xl duration-200`}
        />
        <p
          className={`${selectedSegment.includes(segment) ? "text-blue-500" : ""}`}
        >
          {segment.at(0).toUpperCase().concat(segment.slice(1))}
        </p>
      </button>
      {selectedSegment.includes(segment) && (
        <IngredientsListForProducts
          segment={segment}
          ingredientsForTheWeek={ingredientsForTheWeek}
        />
      )}
    </ul>
  );
}

function IngredientsListForProducts({ segment, ingredientsForTheWeek }) {
  const { ingredients } = useIngredients();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {ingredientsForTheWeek[segment].map((insumo) => {
        const currentInsumo = ingredients.find(
          (el) => el._id === insumo.insumo,
        );

        return (
          <li
            className="mt-3 pl-6"
            key={insumo.insumo}
            onMouseEnter={() => setIsHovered(currentInsumo.idExterno)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              className={`${isHovered === currentInsumo.idExterno ? "text-blue-500 underline underline-offset-4" : ""}`}
              to={`/overview/ingredientes/${currentInsumo.idExterno}`}
            >
              {currentInsumo.nome
                .at(0)
                .toUpperCase()
                .concat(currentInsumo.nome.toLowerCase().slice(1))}
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default ProductDetailsNavigation;
