import {auth, firestore } from '../firebaseConfig';
import * as ActionTypes from './ActionTypes';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import {doc, collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, updateDoc } from 'firebase/firestore';

export const fetchClothes = () => async (dispatch) => {
  dispatch(clothesLoading(true));

  try {
    const clothesCollection = collection(firestore, 'clothes');
    const snapshot = await getDocs(clothesCollection);

    let clothes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const _id = doc.id;
      clothes.push({ _id, ...data });
    });
    dispatch(addClothes(clothes));
  } catch (error) {
    dispatch(clothesFailed(error.message));
  }
};

export const clothesLoading = () => ({
  type: ActionTypes.CLOTHES_LOADING
});

export const clothesFailed = (errmess) => ({
  type: ActionTypes.CLOTHES_FAILED,
  payload: errmess
});

export const addClothes = (clothes) => ({
  type: ActionTypes.ADD_CLOTHES,
  payload: clothes
});

export const fetchFeats = () => async (dispatch) => {
  dispatch(featsLoading(true));

  try {
    const clothesCollection = collection(firestore, 'feat');
    const snapshot = await getDocs(clothesCollection);

    let clothes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const _id = doc.id;
      clothes.push({ _id, ...data });
    });
    dispatch(addFeats(clothes));
  } catch (error) {
    dispatch(featsFailed(error.message));
  }
};

export const featsLoading = () => ({
  type: ActionTypes.FEATS_LOADING
});

export const featsFailed = (errmess) => ({
  type: ActionTypes.FEATS_FAILED,
  payload: errmess
});

export const addFeats = (clothes) => ({
  type: ActionTypes.ADD_FEATS,
  payload: clothes
});

export const fetchReviews = () => async (dispatch) => {
  
  try {
    const revsCollection = collection(firestore, 'reviews');
    const snapshot = await getDocs(revsCollection);

    let reviews = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const _id = doc.id;
      reviews.push({ _id, ...data });
    });

    dispatch(addReviews(reviews));
  } catch (error) {
    dispatch(reviewsFailed(error.message));
  }
};

export const postReview = (clothId, rating, review) => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  const revCollection = collection(firestore, 'reviews');
  const newRev = {
    author: {
      '_id': auth.currentUser.uid,
      'firstname': auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
    },
    cloth: clothId,
    rating: rating,
    review: review,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  addDoc(revCollection, newRev)
  .then((docRef) => {
    const revDoc = doc(firestore, 'reviews', docRef.id); // Corrected line
    return getDoc(revDoc); // Use getDoc instead of getDocs
  })
  .then((doc) => {
    if (doc.exists()) {
      const data = doc.data();
      const _id = doc.id;
      let review = { _id, ...data };
      dispatch(addReview(review));
    } else {
      console.log("No such document!");
    }
  })
  .catch(error => {
    console.log('Post review ', error.message);
    alert('Your review could not be posted\nError: ' + error.message);
  });
};

export const addReview = (rev) => ({
  type: ActionTypes.ADD_REVIEW,
  payload: rev
});

export const addReviews = (rev) => ({
  type: ActionTypes.ADD_REVIEWS,
  payload: rev
});

export const reviewsFailed = (errmess) => ({
  type: ActionTypes.REVIEWS_FAILED,
  payload: errmess
});

export const fetchCarts = () => async (dispatch) => {
  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log('No user logged in!');
      dispatch(cartsLoading(false));
      unsubscribeAuth(); 
      return;
    }
    const cartsCollection = collection(firestore, 'carts');
    dispatch(cartsLoading(true));

    try {
      const snapshot = await getDocs(query(cartsCollection, where('user', '==', auth.currentUser.uid)));
      snapshot.forEach((doc) => {
        const complete = doc.data()
        //console.log(complete.cart)
        dispatch(addCarts(complete.cart));
      });
    } catch (error) {
      dispatch(cartsFailed(error.message));
    }
  });
};


export const postCart = (clothId, image, size, color) => async (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  const cartsCollection = collection(firestore, 'carts');
  const querySnapshot = await getDocs(
    query(cartsCollection, where('user', '==', auth.currentUser.uid))
  );

  if (querySnapshot.empty) {
    console.log('User has no cart yet. Creating new cart document...');
    // Create a new cart document for the user if it doesn't exist
    const newCartDoc = {
      user: auth.currentUser.uid,
      cart: [{ clothid: clothId, image: image, size: size, color: color }]
    };
    await addDoc(cartsCollection, newCartDoc);
    dispatch(addCart(newCartDoc.cart));
    console.log('New cart document created.');
    return;
  }

  // If user already has a cart, update the existing document
  const cartsDoc = querySnapshot.docs[0];
  const cartData = cartsDoc.data();
  const currentCart = cartData.cart || []; // Existing cart or empty array

  const cartItemIndex = currentCart.findIndex(item => item.clothid === clothId);

  if (cartItemIndex === -1) {
    // Add new cart item if it's not already in the array
    const updatedCart = [...currentCart, { clothid: clothId, image: image, size: size, color: color }];
    await updateDoc(cartsDoc.ref, { cart: updatedCart });
    dispatch(addCart([{ clothid: clothId, image: image, size: size, color: color }]));
    console.log('New cart item added.');
  } else {
    console.log('Cart item already exists.');
  }
};


export const deleteCart = (clothId) => async (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  const user = auth.currentUser;
  const cartsCollection = collection(firestore, 'carts');
  const querySnapshot = await getDocs(query(cartsCollection, where('user', '==', user.uid)));

  try {
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const cartArray = data.cart;
      const updatedCartArray = cartArray.filter(cart => cart.clothid !== clothId);

      if (updatedCartArray.length !== cartArray.length) {
        await updateDoc(doc.ref, { cart: updatedCartArray })
        dispatch(fetchCarts());
      }
    });
  } catch (error) {
    dispatch(cartsFailed(error.message));
  }
};

export const cartsLoading = () => ({
  type: ActionTypes.CARTS_LOADING
});

export const cartsFailed = (errmess) => ({
  type: ActionTypes.CARTS_FAILED,
  payload: errmess
});

export const addCart = (favorites) => ({
  type: ActionTypes.ADD_CART,
  payload: favorites
});

export const addCarts = (favorites) => ({
  type: ActionTypes.ADD_CARTS,
  payload: favorites
});

export const fetchDeals = () => async (dispatch) => {
  dispatch(dealsLoading(true));

  try {
    const dealsCollection = collection(firestore, 'deals');
    const snapshot = await getDocs(dealsCollection);

    let deals = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const _id = doc.id;
      deals.push({ _id, ...data });
    });
    dispatch(addDeals(deals));
  } catch (error) {
    dispatch(dealsFailed(error.message));
  }
};

export const dealsLoading = () => ({
  type: ActionTypes.DEALS_LOADING
});

export const dealsFailed = (errmess) => ({
  type: ActionTypes.DEALS_FAILED,
  payload: errmess
});

export const addDeals = (dishes) => ({
  type: ActionTypes.ADD_DEALS,
  payload: dishes
});

export const googleLogin = () => async (dispatch) => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      var user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
  
      // Dispatch the success action
      //dispatch(fetchFavorites());
      dispatch(receiveLogin(user));
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
  
  export const loginUser = (creds) => async (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
  
    try {
      await signInWithEmailAndPassword(auth, creds.username, creds.password);
      var user = auth.currentUser;
      localStorage.setItem('user', JSON.stringify(user));
  
      // Dispatch the success action
      //dispatch(fetchFavorites());
      dispatch(receiveLogin(user));
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
  
  export const logoutUser = () => async (dispatch) => {
    dispatch(requestLogout());
  
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      dispatch(receiveLogout());
    } catch (error) {
      // Handle sign-out error
      console.error('Logout error:', error.message);
    }
  };
  
  export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
  }
  
  export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
  }
  
  export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
  }
  
  export const receiveLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
  }
  
  export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
  }