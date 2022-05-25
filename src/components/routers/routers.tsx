import { Route, Routes } from 'react-router-dom';
import {CreateEdit, Home, SingleNote} from '../../pages';

export function Routers() {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/:id'} element={<SingleNote />} />
            <Route path={'create'} element={<CreateEdit />} />
            <Route path={'edit'} element={<CreateEdit />} />
        </Routes>
    )
}
