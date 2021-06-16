import React from 'react';
import { createCheckoutSession } from '../redux/stripe';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../components/Loading';
// import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_live_51Iy6rkKshOV09SHWhciiHOTPHnxu17bVqdRJrlvEOFFZ2LnkQtZvMLFosKK6PKhqNrhsQtvnpaI5IUBXa7TbPvl700qlyScOuw');

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