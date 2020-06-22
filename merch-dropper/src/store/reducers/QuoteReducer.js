import {GET_QUOTE_FAILURE, GET_QUOTE_START, GET_QUOTE_SUCCESS, ADD_ADDRESS_SUCCESS, ADD_PRODUCT_QUOTE, SET_DESIGNID_QUOTE, NULL_ORDER_TOKEN} from "../actions"

export const initialQuoteState =  {
    isReadyToMount: false,
    sendQuote:{
        quoteInfo: { 
            storeID: parseInt(localStorage.getItem('storeID')),
            // userID: parseInt(localStorage.getItem('id'))
         },
        spInfo: {
            type: "dtg",
            designId: null,
            products: [
                {	
                id: "",
                color: "",
                size: "",
                quantity: null,
                }
            ],
            address:  {
                name: "",
                address1: "",
                city: "",
                state: "",
                zip: "",
                // country: ""
            }
        }
    },

    // bulkQuote: [{
    //     spInfo: {
    //         type: "dtg",
    //         designId: null,
    //         products: [
    //             {	
    //             id: null,
    //             color: "",
    //             size: "",
    //             quantity: null,
    //             }
    //         ],
    //         address:  {
    //             name: "",
    //             company: "",
    //             address1: "",
    //             address2: "",
    //             city: "",
    //             state: "",
    //             zip: "",
    //             country: ""
    //         }
    //     }
    // }],

    quote:{ 
    userID: null, 
    // userID was -> parseInt(localStorage.getItem('id')), without buyer user this seems unnecessary
    storeID: null,
    total: 0.00,
    subtotal: 0.00,
    tax: 0.00,
    fees: 0.00,
    shipping: 0.00,
    orderToken: "",
    warnings: "",
    mode: "",
    isFetching: false,
    error: ''
}
}

export const QuoteReducer = (state = initialQuoteState, action) => {
    switch(action.type){
        case GET_QUOTE_START:
            return{
                ...state,
                isFetching: true,
                isReadyToMount: true
            };
        case GET_QUOTE_SUCCESS:
            return{
                ...state,
                quote: action.payload,
                isFetching: false,
                isReadyToMount: true
                
            };
        case GET_QUOTE_FAILURE:
            return{
                ...state,
                isFetching: false,
                error: action.payload
        };
        case NULL_ORDER_TOKEN:
            return{
                ...state,
                isFetching: false,
                quote: action.payload,
                error: "orderToken is null"
        };
        case ADD_ADDRESS_SUCCESS:
            return{
                ...state,
                sendQuote: {
                    ...state.sendQuote,
                    spInfo:{
                        ...state.sendQuote.spInfo,
                    address: action.payload
                    }
                }                
            };
        case ADD_PRODUCT_QUOTE:
            return{
                ...state,
                sendQuote:{
                    ...state.sendQuote,
                    quoteInfo:{
                        ...state.sendQuote.quoteInfo,
                        storeID: action.payload.spInfo.products[0].storeID,
                        userID: 1
                    },
                    spInfo: 
                    {
                    ...state.sendQuote.spInfo,                        
                        type: action.payload.spInfo.products[0].type,
                        designId: action.payload.spInfo.products[0].designId,
                        products:[{
                            id: action.payload.spInfo.products[0].product_id,
                            color:action.payload.spInfo.products[0].color,
                            size:"med",
                            quantity: action.payload.spInfo.products[0].quantity
                            }]
                }
                }
                    
              
            };
        
        default:
            return state;
    }
}
export default QuoteReducer;
