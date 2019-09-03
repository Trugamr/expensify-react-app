import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from '../utils/numeral-locales';

numeral.locale('in')

const ExpressListItem = ({ id, description, amount, createdAt }) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3>{description}</h3>
            <span>{moment(createdAt).format('MMM Do, YYYY')}</span>
        </div>        
        <h3>{numeral(amount / 100).format('$0,0.00')}</h3>
    </Link>
)

export default ExpressListItem