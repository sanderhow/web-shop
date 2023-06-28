import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { IUserData } from "../../Components/SmallProductCard/SmallProductCard";

interface IUserContext {
  userItems: IUserData | undefined;
  setUserItems(items: IUserData | undefined): void;
  isAuth: boolean;
  setIsAuth(isAuth: boolean): void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);
UserContext.displayName = "UserContext";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userItems, setUserItems] = useState<IUserData | undefined>();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const contextData: IUserContext = useMemo(
    () => ({
      userItems,
      setUserItems,
      isAuth,
      setIsAuth,
    }),
    [userItems, isAuth]
  );

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default UserContext;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Context not found.");
  }
  return context;
};
