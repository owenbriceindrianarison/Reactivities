import { AppThunk } from '../store';
import { addComment, createHubConnection, loadComments } from './commentSlice';
import { ChatComment } from './model/comment';

export const createHubConnectionAsync =
  (activityId: string): AppThunk =>
  async (dispatch, getState) => {
    const selectedActivity = getState().activitySlice.selectedActivity;
    const user = getState().userSlice.user;

    if (selectedActivity) {
      dispatch(
        createHubConnection({
          activityId: activityId,
          token: user!.token,
          selectedActivity: selectedActivity!,
        })
      );

      if (getState().commentSlice.hubConnection) {
        getState().commentSlice.hubConnection!.on(
          'LoadComments',
          (comments: ChatComment[]) => {
            comments.forEach((comment) => {
              comment.createdAt = new Date(comment.createdAt);
            });
            dispatch(loadComments({ comments }));
          }
        );

        getState().commentSlice.hubConnection!.on(
          'ReceiveComment',
          (comment: ChatComment) => {
            comment.createdAt = new Date(comment.createdAt);
            dispatch(addComment({ comment }));
          }
        );
      }
    }
  };

export const addCommentAsync =
  (comment: { body: string; activityId: string }): AppThunk<Promise<void>> =>
  async (_, getState) => {
    try {
      if (getState().commentSlice.hubConnection) {
        await getState().commentSlice.hubConnection!.invoke(
          'SendComment',
          comment
        );
      }
    } catch (error) {
      console.log(error);
    }

    return;
  };
