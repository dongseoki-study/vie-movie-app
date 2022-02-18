import {createRouter, createWebHashHistory} from 'vue-router';

import Home from './Home';
import About from './About';
import Movie from './Movie';
import NotFound from './NotFound'

export default createRouter({
    // Hash 모드 
    history: createWebHashHistory(),

    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
      },
    // pages
    routes: [
        {
            path:'/',
            component:Home
        },
        {
            path:'/about',
            component:About
        },
        {
            path:'/movie/:id',
            component:Movie
        },
        {
            //path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound
            path: '/:notFound(.*)*', 
            component: NotFound
        }
    ]
})