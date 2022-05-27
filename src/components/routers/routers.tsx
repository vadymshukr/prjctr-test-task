import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {CreateEdit, Home, SingleNote} from '../../pages';
import React from 'react';
import {RouterProvider} from '../../contexts/router-context';

export function Routers() {
    return (
            <BrowserRouter>
                <RouterProvider>
                    <Routes>
                        <Route path={'/'} element={<Home />} />
                        <Route path={'/:id'} element={<SingleNote />} />
                        <Route path={'create'} element={<CreateEdit />} />
                        <Route path={'edit'} element={<CreateEdit />} />
                    </Routes>
                </RouterProvider>
            </BrowserRouter>

    )
}
