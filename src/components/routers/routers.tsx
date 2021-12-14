import { Route, Routes } from 'react-router-dom';
import { Home, SingleNote } from '../../pages';

export function Routers() {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/:id'} element={<SingleNote />} />
        </Routes>
    )
}