import {createStore} from 'vuex';
//import movie from '.movie.js'
import movie from './movie' //생략 가능
import about from './about' //생략 가능

export default createStore({
    modules: {
        movie,
        about
    }
})