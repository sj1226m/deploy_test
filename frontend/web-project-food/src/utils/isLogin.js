import { useState, useEffect } from "react";
import { getStorageItem } from "./useLocalStorage";

// isLogin 상태를 관리하는 커스텀 훅
export function useIsLogin() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(true);
    const storedToken = getStorageItem("token", "");
    if (storedToken.length === 0) {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
}
