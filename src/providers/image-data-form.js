import {Platform} from 'react-native';


class ImageDataForm {

    createFormData = (photo) => {
        const data = new FormData();

        data.append('image',photo.data);

        return data;
    };
}

export default new ImageDataForm();

