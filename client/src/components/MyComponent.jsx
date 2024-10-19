import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
    const { userInfo } = useAuth(); // Get user info from context

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {userInfo ? (
                <h1 className="text-2xl font-bold text-purple-600">
                    Welcome, {userInfo.name}!
                </h1>
            ) : (
                <h1 className="text-xl text-red-500">Please log in.</h1>
            )}
        </div>
    );
};

export default MyComponent;
