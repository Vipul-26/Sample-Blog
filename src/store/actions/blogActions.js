export const createBlog = (blog) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('blogs').add({
      ...blog,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
      notificationContent: 'posted a new blog'
    }).then(() => {
      dispatch({ type: 'CREATE_BLOG_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_BLOG_ERROR' }, err);
    });
  };
};