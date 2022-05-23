import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {CreateEdit, Home, SingleNote} from '../../pages';
import React from 'react';

export function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/:id'} element={<SingleNote />} />
                <Route path={'create'} element={<CreateEdit />} />
                <Route path={'edit'} element={<CreateEdit />} />
            </Routes>
        </BrowserRouter>
    )
}
