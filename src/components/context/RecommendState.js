import RecommendContext from './RecommendContext'
import { useState } from 'react'
import axios from 'axios'
const RecommendState = (props) => {
    
    const [profileData, setProfileData] = useState('')

    function getData(titlee) {
        axios({
            method: "GET",
            url: `/recommend?title=${titlee}`
        })
            .then((response) => {
                const res = response.data;
                setProfileData(({
                    value : res.values,
                }))
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    return (    
        <RecommendContext.Provider value={{getData  , profileData , setProfileData} }>
            {props.children};
        </RecommendContext.Provider>
    )
}


export default RecommendState;
