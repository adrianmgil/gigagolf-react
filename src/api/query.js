import { QueryCache, QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => console.log(error),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
      },
    },
  });

  export const get = async (url) => {
    //const token = await acquireTokenSilent();
    const config = {
        method: 'GET',
        headers: {
            //Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
    };
    return fetch(url, config);
  };
  