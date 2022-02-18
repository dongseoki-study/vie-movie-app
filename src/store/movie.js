import axios from "axios";
import _uniqBy from 'lodash/uniqBy';

const _defaultMessage = 'Search for the movie title!';

export default {
    //module
    namespaced: true,
    // data
    state: () => ({}, {
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: []
    }),
    //computed
    getters: {
        // movieIds(state) {
        //     return state.movies.map(m => m.imdbID)
        // }
    },
    //methods
    // 여기에서만 변경 가능
    mutations: {

        updateState(state, payload) {

            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
            })

        },

        resetMovies(state) {
            state.movies = [];
            state.message =_defaultMessage;
            state.loading = false;
        }
    },
    // 변경과 관련없는 함수 적용 - 기본적으로 비동기로 함수가 처리됨
    actions: {
        //async searchMovies(context, payload) {
        async searchMovies({state, commit}, payload) {
            
            if(state.loading){
                return;
            }

            commit('updateState', {
                movies:[],
                message: '',
                loading: true
            })

            try {
            // const {title, type, number, year} = payload

                // const OMDB_API_KEY = "7035c60c";

                // const API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`;
        
                // const result = await axios.get(API_URL);

                const result =  await _fetchMovie({
                    ...payload,
                    page : 1
                });
        
                //console.log(result);

                console.log(result.data);

                const {Search, totalResults} = result.data;
                
                //context.commit('updateState', {
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID'),
                    message: '',
                    loading: true
                })

                const total = parseInt(totalResults, 10);
                const pageLength = Math.ceil(total / 10);

                if(pageLength > 1){
                    for(let page=2;page <=pageLength;page++){
                        //if(page > number/10){
                        if(page > payload.number/10){
                            break;
                        }

                        // const API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
                        // const result = await axios.get(API_URL);

                        const result =  await _fetchMovie({
                            ...payload,
                            page
                        });
            

                        const {Search} = result.data;
                        commit('updateState', {
                            movies:[
                                ...state.movies, 
                                ..._uniqBy(Search, 'imdbID')
                            ]
                        })

                    }
                }



            }catch(err) {
                commit('updateState', {
                    movies:[],
                    message: err
                });
            }finally{
                commit('updateState', {
                    loading: false
                })

            }


        },
        async searchMovieWithId({state, commit}, payload) {
            if(state.loading){
                return;
            }

            commit('updateState', {
                theMovie:{},
                loading: true
            });

            try{
                //console.log(payload);
                const res = await _fetchMovie(
                    payload
                );
                commit('updateState', {
                    theMovie:res.data
                });
                console.log(res.data);
            }catch(err) {
                commit('updateState', {
                    theMovie:{}
                });
            }finally{
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

async function _fetchMovie(payload){
    
    /*
    const {title, type, number, year, page, id} = payload;

    console.log(payload);
    console.log(id);

    const OMDB_API_KEY = "7035c60c";

    const API_URL = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    ;

    console.log(API_URL);

    //const API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`; // 고의 정상 에러 처리 시키기

    return new Promise((resolve, reject) => {
        axios.get(API_URL)
        .then((res) => {
            //console.log(res);
            //if(res["Response"] === 'False'){
            if(res.data.Error){
                reject(res.data.Error);
            }
            resolve(res);
        })
        .catch((err) => {
            console.log(err);
            reject(err.message);
        });

    });

    */

    return await axios.post('/.netlify/functions/movie', payload);

}

