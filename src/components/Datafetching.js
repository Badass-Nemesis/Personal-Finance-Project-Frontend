import React, {useEffect , useState} from 'react'
import axios from 'axios'

function Datafetching (){
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/category')
        .then(res => {
            console.log(res)
            setPost(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
        return (
            <div>
                <ul>
                    {
                        post.map(
                            post => (
                                <li key={post.id} className='name'>{post.name}
                                <ol>
                                    {
                                        post.transactions.map(
                                            post => {
                                                return(
                                                    <div>
                                                        <li key={post.id}>
                                                            Amount Transfered : {post.amount}
                                                        </li>
                                                        <li key={post.id}>
                                                            Beneficiary Account : {post.beneficiaryName}
                                                        </li>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </ol>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
  )
}

export default Datafetching
