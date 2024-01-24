import axios from 'axios'
import { useLoaderData, useNavigation } from 'react-router-dom'
export const Data = () => {
    const dogUrl: any = useLoaderData()
    const navigation = useNavigation()
    if (navigation.state === 'loading') {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <h1>Data</h1>
            <img src={dogUrl} alt="dog" />
        </div>
    )
}

export const dataLoader = async () => {
    const { data } = await axios.get('https://random.dog/woof.json')
    return data.url
}
