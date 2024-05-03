import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'

export const POSTADMIN_TYPES= {
    CREATE_POSTADMIN: 'CREATE_POSTADMIN',
    LOADING_POSTADMIN: 'LOADING_POSTADMIN',
    GET_POSTSADMIN: 'GET_POSTSADMIN',
    UPDATE_POSTADMIN: 'UPDATE_POSTADMIN',
    GET_POSTADMIN: 'GET_POSTADMIN',
    DELETE_POSTADMIN: 'DELETE_POSTADMIN'
}


export const createPostadmin = ({content, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)

        const res = await postDataAPI('postsadmin', { content, images: media }, auth.token)

        dispatch({ 
            type: POSTADMIN_TYPES.CREATE_POSTADMIN, 
            payload: {...res.data.newPost, user: auth.user} 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'ajouter une nouvelle publication.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content, 
            image: media[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPostsadmin = (token) => async (dispatch) => {
    try {
        dispatch({ type: POSTADMIN_TYPES.LOADING_POSTADMIN, payload: true })
        const res = await getDataAPI('postsadmin', token)
        
        dispatch({
            type: POSTADMIN_TYPES.GET_POSTSADMIN,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: POSTADMIN_TYPES.LOADING_POSTADMIN, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const updatePostadmin = ({content, images, auth, statusadmin}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(statusadmin.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === statusadmin.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`postadmin/${statusadmin._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: POSTADMIN_TYPES.UPDATE_POSTADMIN, payload: res.data.newPost })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const likePostadmin = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({ type: POSTADMIN_TYPES.UPDATE_POSTADMIN, payload: newPost})

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
        
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'il a aimé votre publication.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            content: post.content, 
            image: post.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unLikePostadmin = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: POSTADMIN_TYPES.UPDATE_POSTADMIN, payload: newPost})

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'il a aimé votre publication.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPostadmin = ({detailPostadmin, id, auth}) => async (dispatch) => {
    if(detailPostadmin.every(postadmin => postadmin._id !== id)){
        try {
            const res = await getDataAPI(`postadmin/${id}`, auth.token)
            dispatch({ type: POSTADMIN_TYPES.GET_POSTADMIN, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const deletePostadmin = ({post, auth, socket}) => async (dispatch) => {
    dispatch({ type: POSTADMIN_TYPES.DELETE_POSTADMIN, payload: post })

    try {
        const res = await deleteDataAPI(`postadmin/${post._id}`, auth.token)

        // Notify
        const msg = {
            id: post._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const savePostadmin = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, post._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unSavePostadmin = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}