import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
    const { userInfo } = useAuth();
    console.log('User Info:', userInfo); // This should log the user object

    return (
        <div>
            {userInfo ? (
                <h1>Welcome, {userInfo.email}</h1>
            ) : (
                <h1>Please log in.</h1>
            )}
        </div>
    );
};

export default MyComponent