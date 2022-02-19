// export function double(num) {
//     if(!num) return 0;
//     return num * 2;
// }

// export function asyncFn() {

//     return new Promise(function(resolve) {
//         setTimeout(() => {
//             resolve('Done!');
//         }, 6000);
//     })

// }

import axios from "axios";
import _upperFirst from 'lodash/upperFirst';
import _toLower from 'lodash/toLower';

export async function fetchMoveTitle() {

    const OMDB_API_KEY="7035c60c";
    const id="tt4520988";
    const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`);

    //https://www.omdbapi.com/?apikey=7035c60c&i=tt4520988

    return _upperFirst(_toLower(res.data.Title));

}
