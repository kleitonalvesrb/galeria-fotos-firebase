import { Photo } from '../../types/Photo';
import * as C from './styles';

type Props = {
    photoItem : Photo
}
export const PhotoItem = ({photoItem} : Props) =>{
    return (
    <C.Container>
        <img src={photoItem.url} alt={photoItem.name}/>
            {photoItem.name}
    </C.Container>)
}


export default PhotoItem;