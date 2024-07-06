import { useState } from "react";
import Logo from "../utils/Logo";
import axios from "axios";
import Loader from "../utils/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/overview/relatorios");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-12 pt-24">
      <div className="flex w-[30%] flex-col items-center justify-center">
        <Logo useLink={false} width="w-[40%] " />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-[20%] flex-col items-start justify-center gap-2 font-montserrat text-gray-800">
          <label className="text-xl text-gray-600 drop-shadow-sm">
            Usuário
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@exemplo.com"
            className="w-full rounded border border-gray-300 p-2 shadow-lg outline-none placeholder:text-sm placeholder:text-gray-300"
          />
        </div>
        <div className="flex w-[20%] flex-col items-start justify-center gap-2 font-montserrat text-gray-800">
          <label className="text-xl text-gray-600 drop-shadow-sm">Senha</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassoword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 text-lg shadow-lg outline-none placeholder:text-sm placeholder:text-gray-300"
          />
        </div>
      </div>

      <button
        className="w-[8%] rounded-lg bg-orange-500 p-4 font-montserrat text-xl text-gray-50 shadow-lg duration-100 hover:underline"
        onClick={() => handleLogin()}
        disabled={isLoading}
      >
        {isLoading ? <Loader size={20} /> : "LOGIN"}
      </button>
    </div>
  );
}

export default Login;
