import { createStore } from 'redux';

const initialState = {
    first: 'qwer',
    second: 'zxc',
    items: [],
    testItems: []
};
const rootReducer = function (state = initialState, action) {
    switch (action.type) {
        case ACTION_CHANGE_FIRST_NAME:
            return { ...state, first: action.payload };
        case ACTION_CHANGE_SECOND_NAME:
            return { ...state, second: action.payload };
        case ACTION_ADD_TEST_ITEM:
            const newItems = state.testItems.slice();
            newItems.push(action.payload);
            return { ...state, testItems: newItems };
        case ACTION_RELOAD_LOG_ITEMS:
            const _items = action.payload.slice();
            return { ...state, items: _items };
        default:
            return state;
    }

};

export const store = createStore(rootReducer);
console.log(store);

//ACTION TYPES
const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME';
const ACTION_CHANGE_SECOND_NAME = 'ACTION_CHANGE_SECOND_NAME';
const ACTION_ADD_TEST_ITEM = 'ACTION_ADD_TEST_ITEM';
const ACTION_RELOAD_LOG_ITEMS = 'ACTION_RELOAD_LOG_ITEMS';

export const mapStateToProps = (state) => {
    console.log(state);
    return {
        first: state.first,
        second: state.second,
        items: state.items,
        testItems: state.testItems
    };
};

//ACTIONS
export const ChangeFirst = (newFirst) => {
    console.log('change first name executed');
    return {
        type: ACTION_CHANGE_FIRST_NAME,
        payload: newFirst
    };
};
export const ChangeSecond = (newSecond) => {
    console.log('change second name executed');
    return {
        type: ACTION_CHANGE_SECOND_NAME,
        payload: newSecond
    };
};

export const AddTestItem = (newTestItem) => {
    console.log('add test item executed');
    return {
        type: ACTION_ADD_TEST_ITEM,
        payload: newTestItem
    };
};

export const ReloadItems = (logItems) => {
    console.log('update log items executed');
    return {
        type: ACTION_RELOAD_LOG_ITEMS,
        payload: logItems
    };
};
