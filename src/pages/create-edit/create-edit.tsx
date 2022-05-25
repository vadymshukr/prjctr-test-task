import React from 'react'
import { CreateNote } from '../../components';
import { useSingleNoteState } from '../../contexts';

export const CreateEdit = () => {
    const [currentNote] = useSingleNoteState();
    return (
        <CreateNote note={currentNote}/>
    )

}
