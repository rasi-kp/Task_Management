import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../service/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await register(username, password);
            console.log(response);

            if (response.message) {
                toast.success("Successfully created User");
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                toast.error(response.error || "User Already Exist");
            }
        } catch (err) {
            setError(err.message || "An unknown error occurred");
            toast.error(err.message || "User Already Exis");
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Register
                </h1>
                {error && <div className="text-red-600 mt-2">{error}</div>}
                <form className="mt-2" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Submit
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an Account{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                        onClick={() => navigate('/')}
                    >
                        Sign In
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
