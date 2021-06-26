import { InputStyle } from './input';

export const TextareaStyle = {
    baseStyle: props => ({
        field: {},
    }),

    variants: {
        outline: props => InputStyle.variants.outline(props).field,
    },
};
