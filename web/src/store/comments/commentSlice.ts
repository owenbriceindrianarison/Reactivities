import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { ChatComment } from './model/comment';
import { Activity } from '../activities/model/activity';

export interface commentState {
  comments: ChatComment[];
  hubConnection: HubConnection | null;
}

const initialState: commentState = {
  comments: [],
  hubConnection: null,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    createHubConnection: (
      state,
      action: PayloadAction<{
        activityId: string;
        token: string;
        selectedActivity: Activity;
      }>
    ) => {
      const { activityId, token } = action.payload;
      state.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      state.hubConnection
        .start()
        .catch((error) =>
          console.log('Error establishing the connection: ', error)
        );
    },

    loadComments: (
      state,
      action: PayloadAction<{ comments: ChatComment[] }>
    ) => {
      state.comments = action.payload.comments;
    },

    addComment: (state, action: PayloadAction<{ comment: ChatComment }>) => {
      const comment = action.payload.comment;
      state.comments.unshift(comment);
    },

    stopHubConnection: (state) => {
      state.hubConnection
        ?.stop()
        .catch((error) => console.log('Error stopping connection : ', error));
    },

    clearComments: (state) => {
      state.comments = [];
      commentSlice.actions.stopHubConnection();
      state.hubConnection
        ?.stop()
        .catch((error) => console.log('Error stopping connection : ', error));
    },
  },
});

export const {
  createHubConnection,
  stopHubConnection,
  clearComments,
  loadComments,
  addComment,
} = commentSlice.actions;

export default commentSlice.reducer;
