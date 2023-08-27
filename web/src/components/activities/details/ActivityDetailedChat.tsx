import { Segment, Header, Comment, Button, Loader } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { clearComments } from '../../../store/comments/commentSlice';
import {
  addCommentAsync,
  createHubConnectionAsync,
} from '../../../store/comments/commentActions.thunk';
import { selectComments } from '../../../store/comments/commentSelectors';
import { format, formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Field, FieldProps, Form, Formik } from 'formik';
import { MyTextArea } from '../../form/MyTextArea';

interface Props {
  activityId: string;
}

export function ActivityDetailedChat({ activityId }: Props) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  console.log('comments in chat : ', { comments });

  useEffect(() => {
    if (activityId) {
      dispatch(createHubConnectionAsync(activityId));
    }

    return () => {
      dispatch(clearComments());
    };
  }, [activityId, dispatch]);
  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          enableReinitialize
          onSubmit={(values, { resetForm }) =>
            dispatch(addCommentAsync(values)).then(() => resetForm())
          }
          initialValues={{ body: '', activityId: activityId }}
          validationSchema={Yup.object({
            body: Yup.string().required(),
            activityId: Yup.string().required(),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className='ui form'>
              <Field name='body'>
                {(props: FieldProps) => (
                  <div style={{ position: 'relative' }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                      rows={2}
                      {...props.field}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                          return;
                        }
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author
                    as={Link}
                    to={`/profiles/${comment.username}`}
                  >
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                  </Comment.Metadata>
                  <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {comment.body}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
      </Segment>
    </>
  );
}
