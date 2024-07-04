import axios from "axios";
import { useState } from "react";

function GraphsIndex() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

  async function analyze() {
    const form = new FormData();

    form.append("pdf", file1);
    form.append("pdf", file2);
    form.append("price", file3);
    form.append("price", file4);

    const res = await axios.post("/api/v1/extract/teste", form);

    console.log(res);
  }

  return (
    <div className="markup col-span-4">
      <p>Eu sou os gráficos :D</p>
      <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
      <input type="file" onChange={(e) => setFile2(e.target.files[0])} />
      <input type="file" onChange={(e) => setFile3(e.target.files[0])} />
      <input type="file" onChange={(e) => setFile4(e.target.files[0])} />
      <button onClick={analyze}>send</button>
    </div>
  );
}

export default GraphsIndex;
