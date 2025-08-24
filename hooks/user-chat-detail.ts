import useSWRMutation from "swr/mutation";
import useSWR from "swr"

const fetcher = async (url: string, { arg }: { arg: any }) => {
    return fetch(`${window.location.origin}/api${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg)
        }).then(res => {
            if (!res.ok) throw new Error('Failed to fetch chat details');
            return res.json();
        });
}

export const useChatDetail = (sessionId: string) => {
    const {data, error, isLoading } = useSWR(['/chatDetail', sessionId ], ([url, id]) => fetcher(url, { arg: { sessionId: id } }));
    return { data, error, isLoading };
};
