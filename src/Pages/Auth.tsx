import { useNavigate, useSearchParams } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import Link from "../Components/Link";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { createStore } from "solid-js/store";
import { useToaster } from "../Providers/ToastProvider";
import { useAuth } from "../Providers/AuthProvider";

const Auth: Component = () => {
    const { showToast } = useToaster();
    const { loggedUser, refreshUser } = useAuth();

    // What context are we on?
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Input for registration
    const [registerInput, setRegisterInput] = createStore({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [registerErrors, setRegisterErrors] = createStore({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onRegisterInput = (name: string, value: string) => {
        setRegisterInput({ [name]: value });
        setRegisterErrors({ [name]: "" }); // Clear error on new input
    };

    const submitRegister = async (e: Event) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerInput)
        });
        const data = await response.json();

        
        if (data.status === "success") {
            navigate("/auth?ctx=login");
            showToast({ status: data.status, message: data.message });
        } else {
            showToast({ status: data.status, message: data.message.split("\n")[0] });

            const errors = data.message.split("\n")[1].split(";").reduce((acc, error) => {
                const [field, message] = error.split(":");
                const fieldKey = field.trim().toLowerCase() === 'confirmpassword' ? 'confirmPassword' : field.trim().toLowerCase();
                acc[fieldKey] = message.trim();
                return acc;
            }, {});
            setRegisterErrors(errors);
        }
    };

    // Input for login
    const [loginInput, setLoginInput] = createStore({
        identity: "",
        password: "",
    });

    const [loginErrors, setLoginErrors] = createStore({
        identity: "",
        password: "",
    });

    const onLoginInput = (name: string, value: string) => {
        setLoginInput({ [name]: value });
        setLoginErrors({ [name]: "" }); // Clear error on new input
    };

    const submitLogin = async (e: Event) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/auths", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInput),
            credentials: "include"
        });
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            navigate("/");
            showToast({ status: responseJson.status, message: responseJson.message });
            refreshUser();
        } else {
            showToast({ status: responseJson.status, message: responseJson.message.split("\n")[0] });
            const errors = responseJson.message.split("\n")[1].split(";").reduce((acc, error) => {
                const [field, message] = error.split(":");
                acc[field.trim().toLowerCase()] = message.trim();
                return acc;
            }, {});
            setLoginErrors(errors);
        }
    };

    // Lifecycle
    onMount(() => {
        // If already logged in, redirect back
        if (loggedUser())
            navigate("/");
    });

    return (
        <>
            {/* Head */}
            {/* <Title>
                {searchParams.ctx === "register"
                    ? "Media Stock - New here? Register for more exploration!"
                    : "Media Stock - Welcome back! Please login."}
            </Title> */}

            {/* Content */}
            <main class="bg-primaryLighter w-full h-full fixed left-0 right-0 bottom-0 top-0">
                {/* Main Content */}
                <div class="bg-white w-7/12 h-fit fixed left-0 right-0 bottom-0 top-0 m-auto
                rounded-lg py-4 pl-8 pr-4 font-['Nunito']
                flex gap-x-5">
                    {/* Form itself */}
                    <section class="flex-grow">
                        {/* Title */}
                        <img src="Logo.png" alt="Logo" width={110} class="mt-5" />
                        <h1 class="font-['Teko'] font-semibold text-6xl mt-8">Get Started</h1>
                        {searchParams.ctx === "register" ? (
                            <>
                                <p class="mt-0 text-sm text-gray-500 font-semibold">
                                    Already have an account? 
                                    <Link href="/auth?ctx=login" class="underline">
                                        Login
                                    </Link>
                                </p>
                                {/* Registration Form */}
                                <form class="mt-10" onSubmit={submitRegister}>
                                    <Input name="username" label="Enter Username" onInput={onRegisterInput} error={registerErrors.username} value={registerInput.username} />
                                    <Input name="email" label="Enter Email" onInput={onRegisterInput} error={registerErrors.email} value={registerInput.email} />
                                    <Input name="password" label="Enter Password" type="password" onInput={onRegisterInput} error={registerErrors.password} value={registerInput.password} />
                                    <Input name="confirmPassword" label="Enter Confirm Password" type="password" onInput={onRegisterInput} error={registerErrors.confirmPassword} value={registerInput.confirmPassword} />
                                    <Button text="Register" class="mt-8" type="submit" />
                                </form>
                            </>
                        ) : (
                            <>
                                <p class="mt-0 text-sm text-gray-500 font-semibold">
                                    Don’t have an account? 
                                    <Link href="/auth?ctx=register" class="underline">
                                        Register
                                    </Link>
                                </p>
                                {/* Login Form */}
                                <form class="mt-10" onSubmit={submitLogin}>
                                    <Input name="identity" label="Enter Email or Username" onInput={onLoginInput} error={loginErrors.identity} value={loginInput.identity} />
                                    <Input name="password" label="Enter Password" type="password" onInput={onLoginInput} error={loginErrors.password} value={loginInput.password} />
                                    <Button text="Login" class="mt-8" type="submit" />
                                    <Link href="/forgot-password" class="underline mt-4 block text-sm text-gray-500">
                                        Forgot your password?
                                    </Link>
                                </form>
                            </>
                        )}
                    </section>

                    {/* Image */}
                    <img src="Auth/AuthAsset.png" alt="Auth Asset" width={475} />

                    {/* Contact */}
                    <section class="absolute left-[51%] top-10 -translate-x-1/2
                        flex items-center text-gray-500 text-sm"
                    >
                        <p>Have question? <br /> <Link href="/">Ask Mr. Harits </Link></p>
                        <img src="Auth/Harits.png" alt="Harits" width={70} class="p-1 bg-white rounded-full" />
                    </section>
                </div>
            </main>
        </>
    );
}

export default Auth;
