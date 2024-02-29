"use client";

import { useCallback, useState } from "react";

type Variant = "LOGIN" | "REGISTER";

export const useToggleVariant = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === "LOGIN" ? "REGISTER" : "LOGIN"
    );
  }, []);

  return { variant, toggleVariant };
};
