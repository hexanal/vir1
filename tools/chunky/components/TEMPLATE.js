function toPascalCase(s) {
    s = s.replace(
        /\w+/g,
        function(w) {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
        }
    );

    return s;
}

export default ({
    type,
    full = false,
}) => `
import { createElement${full ? ', useState, useEffect ':''}} from 'react';
// import { toComponent } from 'chunky';

export default {
    type: '${type}',
    view: ${toPascalCase(type)},
    edit: ${toPascalCase(type)+'Editor'},
};

export function ${toPascalCase(type)}(props) {${full ?  `
    const [someVariable, setSomeVariable] = useState(null);
    
    function onSomeEvent(e) {
        console.log({e});
    }
    
    useEffect(() => {
        pong('CHUNK_CHANGE', createNewChunk);
        return () => unpong('CHUNK_CHANGE', createNewChunk);
    }, []);
    ` : ''}
    return createElement(
        'div',
        { className: '${type}' },
        [
            createElement('div', null, 'Hello World!'),
        ]
    );
}

export function ${toPascalCase(type)}Editor(props) {${full ?  `
    const [someVariable, setSomeVariable] = useState(null);
    
    function onSomeEvent(e) {
        console.log({e});
    }
    
    useEffect(() => {
        pong('CHUNK_CHANGE', createNewChunk);
        return () => unpong('CHUNK_CHANGE', createNewChunk);
    }, []);
    ` : ''}
    return createElement(
        'div',
        { className: '${type}' },
        [
            createElement('div', null, 'Hello World!'),
        ]
    );
}

`
