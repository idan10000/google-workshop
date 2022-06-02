class Report {

    constructor(image, imagePath, location, date, tagList, description, dogBreed,phoneNumber,contact, user) {
        this.image = image;
        this.imagePath = imagePath;
        this.location = location;
        this.date = date;
        this.tagList = tagList
        this.description = description
        this.user = user
        this.dogBreed = dogBreed
        this.contact = contact
        this.phoneNumber = phoneNumber
    }
}

export const reportConverter = {
    toFirestore: (report) => {
        return {
            image: report.image,
            imagePath: report.imagePath,
            location: report.location,
            date: report.date,
            tagList: report.tagList,
            description: report.description,
            dogBreed: report.dogBreed,
            phoneNumber: report.phoneNumber,
            contact : report.contact,
            user: report.user
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Report(data.image, data.imagePath, data.location, data.date, data.tagList, data.description, data.dogBreed,data.phoneNumber,data.contact, data.user);
    }
};

export default Report
