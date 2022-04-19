class Poster {

    constructor(image, location, date, tagList, description, dogName, user) {
        this.image = image;
        this.location = location;
        this.date = date;
        this.tagList = tagList;
        this.description = description;
        this.dogName = dogName;
        this.user = user;
    }


}

// Firestore data converter
export const posterConverter = {
    toFirestore: (poster) => {
        return {
            image: poster.image,
            location: poster.location,
            date: poster.date,
            tagList: poster.tagList,
            description: poster.description,
            dogName: poster.dogName,
            user: poster.user
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Poster(data.image, data.location, data.date, data.tagList, data.description, data.dogName, data.user);
    }
};

export default Poster
