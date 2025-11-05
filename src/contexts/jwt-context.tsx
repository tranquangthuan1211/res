import { createContext, useCallback, useEffect, useReducer, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/users";


interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

enum ActionType {
  UPDATE = "UPDATE",
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type UpdateAction = {
  type: ActionType.UPDATE;
  payload: { user: Partial<User> };
};

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: { isAuthenticated: boolean; user: User | null };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: { user: User };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: { user: User };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = UpdateAction | InitializeAction | SignInAction | SignUpAction | SignOutAction;
type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  [ActionType.UPDATE]: (state, action: UpdateAction): State => {
    const { user } = action.payload;
    return {
      ...state,
      user: state.user ? { ...state.user, ...user } : null,
    };
  },

  [ActionType.INITIALIZE]: (state, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  [ActionType.SIGN_IN]: (state, action: SignInAction): State => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  [ActionType.SIGN_UP]: (state, action: SignUpAction): State => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  [ActionType.SIGN_OUT]: (state): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextType extends State {
  updateUser: (user: Partial<User>) => void;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  updateUser: () => {},
  signIn: async () => Promise.resolve({} as User),
  signOut: async () => Promise.resolve(),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const updateUser = useCallback((user: Partial<User>) => {
    dispatch({
      type: ActionType.UPDATE,
      payload: { user },
    });
  }, []);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const storedUser = localStorage.getItem("users");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: { isAuthenticated: true, user: parsedUser },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);
  const signIn = useCallback(async (email: string, password: string): Promise<User> => {
    const userData = { email, password, id: 1, name: "Test", role: "user" }; 
    localStorage.setItem("users", JSON.stringify(userData));

    dispatch({
      type: ActionType.SIGN_IN,
      payload: { user: userData as User },
    });

    return userData as User;
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    localStorage.removeItem("users");
    dispatch({ type: ActionType.SIGN_OUT });
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        updateUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
