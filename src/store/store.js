import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO: add more slices here for posts
    },
    optimizeDeps: {
        include: ['@tinymce/tinymce-react'],
    }
});


export default store;