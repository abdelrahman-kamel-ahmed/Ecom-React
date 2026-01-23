import toast from "react-hot-toast";
export function errorHandler(error) {
    const message= error?.response?.data?.message ?? "Something went wrong!";
    toast.error(message);
}
