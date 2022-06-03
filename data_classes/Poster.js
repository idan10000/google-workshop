class Poster {

    constructor(image, imagePath, location, address, date, tagList, description, dogName, dogBreed,phoneNumber,name, user) {
        this.image = image;
        this.imagePath = imagePath;
        this.location = location;
        this.address = address;
        this.date = date;
        this.tagList = tagList;
        this.description = description;
        this.dogName = dogName;
        this.dogBreed = dogBreed
        this.user = user;
        this.name = name;
        this.phoneNumber = phoneNumber
    }


}

// Firestore data converter
export const posterConverter = {
    toFirestore: (poster) => {
        return {
            image: poster.image,
            imagePath:poster.imagePath,
            location: poster.location,
            address:poster.address,
            date: poster.date,
            tagList: poster.tagList,
            description: poster.description,
            dogName: poster.dogName,
            dogBreed: poster.dogBreed,
            phoneNumber: poster.phoneNumber,
            name: poster.name,
            user: poster.user
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Poster(data.image, data.imagePath, data.location, data.address, data.date, data.tagList, data.description, data.dogName, data.dogBreed,data.phoneNumber,data.name, data.user);
    }
};

export default Poster
