import { signInRequest } from "@/api/auth";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query"; // useMutation is used for operations that change data on the server, such as POST, PUT, DELETE requests. It provides a way to manage the state of these operations, including loading, success, and error states.
import { toast } from "sonner";

export const useSignin = () => {

    const {setAuth} = useAuth();

    const {isPending, isSuccess, error, mutateAsync:signinMutation} = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            // console.log("response.data =", response.data);
            // console.log("response.data.user =", response.data.user);
            console.log('Successfully signed in : ', response);
            const userObject = JSON.stringify(response.data);
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data.token);

            setAuth({
                token: response.data.token,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    avatar: response.data.avatar,
                    _id:response.data._id
                },
                isLoading: false
            });

            toast.success("User logged in Successfully");
        },
        onError: (error) => {
            console.error('Failed to sign in : ', error);
            toast.error(
                error?.message || "Sign in failed"
            );
        }
    });
    return {
        isPending, 
        isSuccess,
        error,
        signinMutation
    }
};