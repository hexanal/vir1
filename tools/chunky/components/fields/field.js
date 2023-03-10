import { createElement } from 'react';

export default {
    type: 'fields-field',
    view: Field,
    // edit: FieldEdit
}

export function Field(props) {
    const { children = null } = props || {};
    // if (!children) return false;

    return createElement(
        'div',
        {
            className: 'chunky-field',
        },
        children
    );
}
