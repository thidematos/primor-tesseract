import { useEffect } from "react";
import { useIngredients } from "../context/IngredientsProvider";
import Title from "../utils/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function IngredientsList() {
  return (
    <div className="col-span-7 flex flex-col items-center justify-start py-16">
      <Title fontSize="text-2xl" margin="mb-10 drop-shadow-sm">
        INSUMOS
      </Title>
      <IngredientsContainer />
    </div>
  );
}

function IngredientsContainer() {
  const { getIngredients, ingredientsSorted } = useIngredients();

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  if (!ingredientsSorted) return null;

  console.log(ingredientsSorted);

  return (
    <div className="grid h-[500px] w-full grid-cols-4 gap-10 overflow-y-scroll p-6">
      {ingredientsSorted.map((ingredient) => (
        <IngredientCard key={ingredient.idExterno} insumo={ingredient} />
      ))}
    </div>
  );
}

function IngredientCard({ insumo }) {
  return (
    <Link
      to={`${insumo.idExterno}`}
      className="col-span-1 flex h-[200px] flex-col items-center justify-around rounded-lg border border-gray-300 p-3 font-montserrat shadow-xl"
    >
      <p className="text-orange-500 drop-shadow-sm">ID: {insumo.idExterno}</p>
      <FontAwesomeIcon
        icon={faSeedling}
        className="text-3xl text-green-600 drop-shadow"
      />
      <p className="text-center text-gray-800 drop-shadow-sm">{insumo.nome}</p>
    </Link>
  );
}

export default IngredientsList;
