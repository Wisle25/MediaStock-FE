import { createContext, useContext, Component, createSignal, ParentProps, onMount, Setter } from "solid-js";

interface User {
    id: string;
    username: string;
    email: string;
    avatarLink: string;
    isVerified: boolean;
}

interface AuthContextType {
    loggedUser: () => User | null;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>();

export const AuthProvider: Component<ParentProps> = (props) => {
    const [loggedUser, setLoggedUser] = createSignal<User | null>(null);

    const fetchUserData = async () => {
        const response = await fetch("http://localhost:8000/auths", {
            method: "GET",
            credentials: "include",
        });
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            setLoggedUser(responseJson.data);
        } else {
            // If not, try to refresh auth/token
            refreshAuth();
        }
    };

    const refreshAuth = async () => {
        const response = await fetch("http://localhost:8000/auths", {
            method: "PUT",
            credentials: "include"
        });
        const responseJson = await response.json();
        console.log("Refreshing Token")

        if (responseJson.status === "success")
            await fetchUserData();
        else
            // User is not logged in anymore
            setLoggedUser(null);
    }

    onMount(async () => {
        await fetchUserData();
    })

    const refreshUser = async () => {
        await fetchUserData();
    }

    return (
        <AuthContext.Provider value={{ loggedUser, refreshUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
