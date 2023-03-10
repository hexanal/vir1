import { createElement } from 'react';
import { toComponent } from 'chunky';

export default {
    type: 'chunky-new-chunk',
    view: ChunkyNewChunk,
};

export function ChunkyNewChunk(props) {
    // const [chunkToCreate, setChunkToEdit] = useState(null);
    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const type = params.get('type');

    //     setType(''
    // }, []);
    
    // @todo could probably be turned into a neat hook
    // function onCreatePage(chunk) {
    //     fetch(`/api/v1/create-chunk`, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'cors', // no-cors, *cors, same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         body: JSON.stringify(chunk)
    //       })
    //         .then(response => response.json())
    //         // .then(data => {
    //         //     setChunkToEdit(data);
    //         // })
    //         .catch(msg => {
    //             console.error(msg);
    //         });
    // }

    // useEffect(() => {
    //     pong('CHUNK_CHANGE', onCreatePage);
    //     return () => unpong('CHUNK_CHANGE', onCreatePage);
    // }, []);

    return createElement(
        'div',
        { className: 'chunky-admin-edit' },
        [
            toComponent({
                type: 'page',
                chunks: []
            }, { context: 'edit' })
        ]
    );
}
