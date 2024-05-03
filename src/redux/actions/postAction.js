import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { getDataAPI, patchDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'


export const POST_TYPES = {

    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST',
    INCREMENT_VIEWS: 'INCREMENT_VIEWS'
}

 


export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts')

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: 2 }
        })

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const updatePost = ({ postData, wilaya, commune, specifications, images, auth, status }) => async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
        status.postData === postData &&
        status.specifications === specifications &&
        imgNewUrl.length === 0 &&
        imgOldUrl.length === status.images.length
    ) {
        return;
    }
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

        const updatedData = {
            content: postData.content,
            direcion: postData.direcion,
            wilaya,
            commune,
            specifications,
            discripcion: postData.discripcion,
            pricesala: postData.pricesala,
            dinero: postData.dinero,
            negociable: postData.negociable,
            nomprenom: postData.nomprenom,
            telefono: postData.telefono,
            email: postData.email,
            web: postData.web,
            informacion: postData.informacion,
            comentarios: postData.comentarios,
            images: [...imgOldUrl, ...media]
        };
        
        const res = await patchDataAPI(`post/${status._id}`, updatedData, auth.token);
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });


        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const likePost = ({ post, auth, socket }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'a aimé votre publication.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }

        dispatch(createNotify({ msg, auth, socket }))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unLikePost = ({ post, auth, socket }) => async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'a aimé votre publication.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({ msg, auth, socket }))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getPost = ({ detailPost, id }) => async (dispatch) => {
    if (detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`)

            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            })
        }
    }
}







export const deletePost = ({ post, auth, socket }) => async (dispatch) => {

    dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token);

        // Notify
        const msg = {
            id: post._id,
            text: 'a ajouter une nouvelle publication Salle des fêtes  .',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        };
        dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const savePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const incrementViews = ({ post }) => async (dispatch) => {

    try {
        await putDataAPI(`post/${post._id}`);



        dispatch({ type: POST_TYPES.INCREMENT_VIEWS, payload: post._id });
    } catch (error) {
        console.error(error);
    }
};


