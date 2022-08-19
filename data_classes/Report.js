class Report {
  constructor(
    image,
    imagePath,
    location,
    address,
    date,
    time,
    tagList,
    description,
    dogBreed,
    phoneNumber,
    contact,
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
    this.user = user;
    this.dogBreed = dogBreed;
    this.contact = contact;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.timeStamp = timeStamp;
  }
}

export const reportConverter = {
  toFirestore: (report) => {
    return {
      image: report.image,
      imagePath: report.imagePath,
      location: report.location,
      address: report.address,
      date: report.date,
      time: report.time,
      tagList: report.tagList,
      description: report.description,
      dogBreed: report.dogBreed,
      phoneNumber: report.phoneNumber,
      contact: report.contact,
      name: report.name,
      user: report.user,
      timeStamp: report.timeStamp,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Report(
      data.image,
      data.imagePath,
      data.location,
      data.address,
      data.date,
      data.time,
      data.tagList,
      data.description,
      data.dogBreed,
      data.phoneNumber,
      data.contact,
      data.name,
      data.user,
      data.timeStamp
    );
  },
};

export default Report
