import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export const useCurrentUser = () => {
    const { data, error } = useSWR('/currentUser', fetcher);
    return { data, error };
}