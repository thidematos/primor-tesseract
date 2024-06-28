import { Text } from "recharts";
import { useIngredients } from "../context/IngredientsProvider";

function PointLabel(props) {
  const { numberToPriceString } = useIngredients();

  return (
    <Text
      x={props.x + 40}
      y={props.y - 10}
      textAnchor="middle"
      className="text-sm text-red-600 drop-shadow-sm"
      fill="rgb(220,38, 38)"
      fontWeight={"bold"}
      fontFamily="Noto"
    >
      {numberToPriceString(props.value)}
    </Text>
  );
}

export default PointLabel;
