import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Deals } from './deals';
import { Clothes } from './clothes';
import { Reviews } from './reviews';
import { Feats } from './feat';
import { cart } from './cart';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigStore = () => {            //used in app.js
    const store = createStore(                //buit in function of redux
        combineReducers({
            auth: Auth,
            deals: Deals,
            clothes: Clothes,
            feats: Feats,
            reviews: Reviews,
            cart
/*             promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            }) */
        }),
        applyMiddleware(thunk, logger)        //check explanation
    );

    return store;
}