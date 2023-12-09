import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Route, Routes } from "react-router-dom";
import Efit from './screen/efit/EFit';
import { queryClient } from './api/query';

const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path='/' element={ <Efit /> } />
            </Routes>
        </QueryClientProvider>
    );
};

export default App;