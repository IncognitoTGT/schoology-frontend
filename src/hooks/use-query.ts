import useAsync from "./use-async";

const useQuery = <T>(path: string, fetcher: (path: string) => Promise<unknown>) => {
	const { data: query, loading, error, run } = useAsync<T[]>([], { useCurrentData: true });

	const fetchQuery = async (query: string) => run(() => fetcher(path.replace("{query}", query)) as Promise<T[]>);

	return {
		query,
		loading,
		error,
		fetchQuery,
	};
};
export default useQuery;
