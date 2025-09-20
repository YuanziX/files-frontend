import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  triggerAuthRefresh: () => void;
  profile: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChanged, setAuthChanged] = useState(0);
  const [profile, setProfile] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL,
        {
          query: `
          query Me {
            me {
              id
              name
              email
            }
          }
        `,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const me = res.data.data.me;
      setProfile(true);
      setUser(me);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, [authChanged]);

  const triggerAuthRefresh = () => {
    setAuthChanged((c) => c + 1);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, triggerAuthRefresh, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
