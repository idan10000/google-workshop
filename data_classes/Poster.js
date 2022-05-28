class Poster {

    constructor(image, imagePath, location, date, tagList, description, dogName, dogBreed, user) {
        this.image = image;
        this.imagePath = imagePath;
        this.location = location;
        this.date = date;
        this.tagList = tagList;
        this.description = description;
        this.dogName = dogName;
        this.dogBreed = dogBreed
        this.user = user;
    }


}

// Firestore data converter
export const posterConverter = {
    toFirestore: (poster) => {
        return {
            image: poster.image,
            imagePath:poster.imagePath,
            location: poster.location,
            date: poster.date,
            tagList: poster.tagList,
            description: poster.description,
            dogName: poster.dogName,
            dogBreed: poster.dogBreed,
            user: poster.user
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Poster(data.image, data.imagePath, data.location, data.date, data.tagList, data.description, data.dogName, data.dogBreed, data.user);
    }
};

export default Poster