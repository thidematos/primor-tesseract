import { useIngredients } from "../context/IngredientsProvider";

function Labels({ payload, label, active }) {
  const { numberToPriceString } = useIngredients();

  if (active)
    return (
      <p className="rounded border border-gray-300 bg-gray-200 p-2 font-noto text-sm text-gray-600 shadow-xl">
        <span className="font-bold tracking-wider text-blue-500">
          {numberToPriceString(payload.at(0).value)}
        </span>{" "}
        em {payload.at(0).payload?.semana}
      </p>
    );
}

export default Labels;
