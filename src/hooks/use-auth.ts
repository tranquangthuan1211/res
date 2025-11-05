import { useContext } from "react";
import type { AuthContextType as JwtAuthContextType } from "../contexts/jwt-context";
import { AuthContext } from "../contexts/jwt-context";

type AuthContextType = JwtAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
