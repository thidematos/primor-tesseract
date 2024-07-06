import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = async () => {
      try {
        await axios.get("/api/v1/auth/auth", {
          withCredentials: true,
        });
      } catch (err) {
        navigate("/");
      }
    };

    auth();
  }, [navigate]);

  return children;
}

export default ProtectRoutes;
