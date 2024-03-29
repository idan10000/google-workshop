class Poster {
  constructor(
    image,
    imagePath,
    location,
    address,
    date,
    time,
    tagList,
    description,
    dogName,
    dogBreed,
    phoneNumber,
    name,
    user,
    timeStamp
  ) {
    this.image = image;
    this.imagePath = imagePath;
    this.location = location;
    this.address = address;
    this.date = date;
    this.time = time;
    this.tagList = tagList;
    this.description = description;
    this.dogName = dogName;
    this.dogBreed = dogBreed;
    this.user = user;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.timeStamp = timeStamp;
  }
}

// Firestore data converter
export const posterConverter = {
  toFirestore: (poster) => {
    return {
      image: poster.image,
      imagePath: poster.imagePath,
      location: poster.location,
      address: poster.address,
      date: poster.date,
      time: poster.time,
      tagList: poster.tagList,
      description: poster.description,
      dogName: poster.dogName,
      dogBreed: poster.dogBreed,
      phoneNumber: poster.phoneNumber,
      name: poster.name,
      user: poster.user,
      timeStamp: poster.timeStamp,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Poster(
      data.image,
      data.imagePath,
      data.location,
      data.address,
      data.date,
      data.time,
      data.tagList,
      data.description,
      data.dogName,
      data.dogBreed,
      data.phoneNumber,
      data.name,
      data.user,
      data.timestamp
    );
  },
};

export default Poster
