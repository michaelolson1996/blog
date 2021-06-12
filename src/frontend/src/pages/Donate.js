import React from 'react';
import { createCheckoutSession } from '../redux/stripe';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../components/Loading';
// import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51Iy6rkKshOV09SHW1DFNCvjnVNlGsW1wOKPq4nNmQBZXS6EhWNJdAeTPmacaeynX09aK4yubaL78hSP0LpRvgwfW00T2PNmENz');

class Donate extends React.Component {

    componentDidMount() {
        this.props.createCheckoutSession();
    }

    componentDidUpdate() {
        this.props.payments.id !== undefined ?
            (async () => {
                const stripe = await stripePromise;
                
                stripe.redirectToCheckout({
                    sessionId: this.props.payments.id,
                });
            })()
        :
            <></>
    }

    render() {
        return (
            <Loading />
        )
    }
}

export default connect(state => state, { createCheckoutSession })(Donate);