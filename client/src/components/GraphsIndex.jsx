import axios from "axios";
import { useState } from "react";

function GraphsIndex() {
  const [file, setFile] = useState(null);

  console.log(file);

  async function analyze() {
    const form = new FormData();

    form.append("teste", file);

    const res = await axios.post("/api/v1/extract/teste", form);

    console.log(res);
  }

  return (
    <div className="markup col-span-4">
      <p>Eu sou os gráficos :D</p>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={analyze}>send</button>
    </div>
  );
}

export default GraphsIndex;
