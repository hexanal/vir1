import { createElement, useState, useEffect } from 'react';
import { toComponent } from 'chunky';
import { Button } from 'chunky/components/fields/button.js';

export default {
    type: 'chunky-pages-list',
    view: ChunkyPagesListsView,
    edit: ChunkyPagesListEditor // @todo?
};

export function ChunkyPagesListsView(props) {
    const { body = null } = props || {};
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetch('/api/v1/get-chunks-of-type/page')
            .then(response => response.json())
            .then(data => {
                setPages(data);
            })
            .catch(msg => {
                console.error(msg);
            });
    }, []);

    return createElement(
        'div',
        { className: 'admin-pages-view-template' },
        [
            body ? toComponent(body) : false,
            pages.length !== 0
                ? pages.map(page => {
                    const {
                        title = '~~',
                        description = '~~',
                        id = '~~'
                    } = page || {};

                    return createElement('div',
                        {
                            padding: '1rem',
                            border: '1px solid hotpint',
                        },
                        [
                            createElement('h2', null,
                                `Title: ${title}`,
                            ),
                            createElement('small', null,
                                `Description: ${description}`
                            ),
                            createElement(Button,
                                {  
                                    href: `/admin/edit?id=${id}`,
                                    label: `edit`
                                },
                                null
                            ),
                        ]
                    )
                })
                : false
        ]
    );
}

export function ChunkyPagesListEditor(props) {
    // const { body = null } = props || {};
    // const [pages, setPages] = useState([]);
    
    // useEffect(() => {
    //     fetch('/api/get-chunks-by-type/page')
    //         .then(response => response.json())
    //         .then(data => {
    //             setPages(data);
    //         })
    //         .catch(console.err);
    // }, []);

    return createElement(
        'div',
        { className: 'admin-pages-view-template' },
        'oh hello there!'
    );
}

