const axios = require('axios');
//const OMDB_API_KEY = process.env.OMDB_API_KEY;
const {OMDB_API_KEY} = process.env;

exports.handler = async function (event, context) {
    
    const payload = JSON.parse(event.body);

    const {title, type, year, page, id} = payload;

    //const OMDB_API_KEY = "[API KEY 정보]";

    const API_URL = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    ;

    console.log(API_URL);

    //const API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`; // 고의 정상 에러 처리 시키기

    try{
        const {data} = await axios.get(API_URL);
        console.log(data);
        if(data.Error){
            return {
                statusCode: 400,
                body: data.Error
            }
        }

        return {
            statusCode: 200, 
            body : JSON.stringify(data)
        }

    }catch(err){
        //console.log(err);
        return {
            statusCode: err.respose.status,
            body: err.message
        }
    }

 }