import React, { useEffect, useState } from 'react'
import axios from 'axios'
import auth from '../Auth'
import withAuth from '../WithAuth'

function Datafetching() {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/category/`, {
            headers: { "x-auth-token": auth.getToken() }
        })
            .then(res => {
                // console.log(res)
                setPost(res.data)
            })
            .catch(err => {
                // console.log(err)
            })
    }, [])
    return (
        <div>

            {
                post.map(
                    post => (
                        <li key={post.id} className='name'>{post.name}
                            <ol>
                                {
                                    post.transactions.map(
                                        post => {
                                            return (
                                                <div>
                                                    <li key={post.id}>
                                                        Amount Transfered : {post.amount}
                                                    </li>
                                                    <li key={post.id}>
                                                        Beneficiary Account : {post.beneficiaryName}
                                                    </li>
                                                </div>
                                            )
                                        })}
                            </ol>
                        </li>
                    )
                )
            }

        </div>
    )
}

export default withAuth(Datafetching);