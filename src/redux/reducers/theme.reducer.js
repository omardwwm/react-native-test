import {DARK_THEME, LIGHT_THEME} from "../../../Theme";

const initialState = {
    theme: false
};
export const themeReducer = (theme = initialState,{ type }) => {
    switch (type) {
        case DARK_THEME:
            return { theme: true };
        case LIGHT_THEME:
            return { theme: false };
        default:
            return theme;
    }
};