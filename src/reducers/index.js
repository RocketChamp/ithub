import {combineReducers} from 'redux'

import posts from './posts'
import auth from './auth'
import users from './users'
import projects from './projects'

export default combineReducers({
    posts,
    auth,
    users, 
    projects
})  