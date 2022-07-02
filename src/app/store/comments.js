import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            if (action.payload.content === null) {
                state.entities.filter(c => c._id !== action.payload.commentId);
            }
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

const commentCreateRequested = createAction("users/commentCreateRequested");
const commentCreateFailed = createAction("users/commentCreateFailed");
const commentRemoveRequested = createAction("users/commentRemoveRequested");
const commentRemoveFailed = createAction("users/commentRemoveFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        dispatch(commentRemoved({ content, commentId }));
    } catch (error) {
        dispatch(commentRemoveFailed(error.message));
    }
};

export const createComment = ({ data, userId, currentUserId }) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment({
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        });
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreateFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
