import { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import Title from "../utils/Title";
import { Link } from "react-router-dom";
import { useWeeks } from "../context/WeeksProvider";

function Reports() {
  const { getAllWeeks, weeks } = useWeeks();

  useEffect(() => {
    getAllWeeks();
  }, [getAllWeeks]);

  if (!weeks) return <Loader position={"col-span-4"} />;

  return (
    <div className="col-span-7 overflow-y-scroll py-[5%]">
      <Title fontSize="text-2xl" gridProperty="text-center" margin="mb-10">
        RELATÓRIOS SEMANAIS
      </Title>
      <WeeklyReports />
    </div>
  );
}

function WeeklyReports() {
  const { weeks } = useWeeks();

  return (
    <div className="col-span-4 flex flex-row flex-wrap items-start justify-center gap-10">
      {weeks.map((week, ind) => (
        <WeekDescription key={week._id} week={week} />
      ))}
    </div>
  );
}

function WeekDescription({ week }) {
  return (
    <Link
      to={`${week._id}`}
      className="flex h-[200px] w-[25%] flex-col items-center justify-center gap-6 rounded-lg border border-gray-300 bg-gray-200 font-montserrat shadow"
    >
      <FontAwesomeIcon
        icon={faFileInvoice}
        className="text-7xl text-blue-500/85 drop-shadow"
      />
      <div className="flex flex-col items-center justify-start gap-1 tracking-wide">
        <p>
          {format(week.intervalo.inicio, "dd MMM'. de' yyyy", {
            locale: ptBR,
          })}
        </p>
        <p>
          {format(week.intervalo.fim, "dd MMM'. de' yyyy", { locale: ptBR })}
        </p>
      </div>
    </Link>
  );
}

export default Reports;
