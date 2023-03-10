import { createElement, useState, useEffect } from 'react';
import { toComponent } from 'chunky';
import { pong, unpong } from 'chunky/pinger.js';

export default {
    type: 'chunky-edit-chunk',
    view: ChunkyEditChunk,
};

export function ChunkyEditChunk(props) {
    const [chunkToEdit, setChunkToEdit] = useState(null);

    function onChunkChange(chunk) {
        console.log({chunk});
    }

    // function createNewChunk(chunk) {
    //     console.log( chunk );

    //     return fetch(`/api/v1/create-chunk`, {
    //         method: 'POST',
    //         mode: 'cors', // no-cors, *cors, same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(chunk)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log({data});
    //         })
    //         .catch(msg => {
    //             console.error(msg);
    //         });
    // }

    // useEffect(() => {
    //     pong('CHUNK_CHANGE', createNewChunk);
    //     return () => unpong('CHUNK_CHANGE', createNewChunk);
    // }, []);
    
    // @todo could probably be turned into a neat hook
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');

        fetch(`/api/v1/get-chunk-by-id/${id}`)
            .then(response => response.json())
            .then(data => {
                setChunkToEdit(data);
            })
            .catch(msg => {
                console.error(msg);
            });
    }, []);

    return createElement(
        'div',
        { className: 'admin-edit' },
        [
            createElement('div', null, 'Hello'),
            chunkToEdit ? createElement('div', null,
            toComponent(chunkToEdit, { context: 'edit', onChunkChange })
            ) : false,
        ]
    );
}
