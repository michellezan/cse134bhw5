function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }
    })
    .catch(reject);
}


function testDBInsert(docData) {
  db = firebase.firestore();
  console.log('testDBInsert');


  docData = {
    post_id: "post-1",
    post_title: "title-1",
    post_date: "date-1",
    post_summary: "summary-1",
  };

  // {"__name__":"/databases/(default)/documents/databases/posts/documents","id":"documents","data":{"post_id":"post-1"}}

  const postsRef = db.collection("posts");

  postsRef.add(docData).then(function () {
    console.log("Document successfully written!");
  });
}

function insertPost(post) {
  const db = firebase.firestore();
  const postsRef = db.collection("posts");
  const ts = firebase.firestore.FieldValue.serverTimestamp();
  return postsRef.add({
    ...post,
    created: ts,
    updated: ts,
  }).then(function (docRef) {
    console.log("Document successfully created!", docRef.id);
    return docRef;
  });
}

function updatePost({
  postId,
  ...rest
}) {
  const db = firebase.firestore();
  const postsRef = db.collection("posts").doc(postId);
  const ts = firebase.firestore.FieldValue.serverTimestamp();
  console.log(rest);
  return postsRef.update({
    ...rest,
    updated: ts,
  }).then(function (docRef) {
    console.log("Document successfully updated!");
    return docRef;
  });
}

function deletePost(postId) {
  const db = firebase.firestore();
  db.collection("posts").doc(postId).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });

}

async function getPosts() {
  const postsRef = await firebase.firestore().collection('posts').get()
  return postsRef.docs.map(doc => ({ ...doc.data(), postId: doc.id, }));
}
