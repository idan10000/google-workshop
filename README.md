# FinDog

Your dog is missing? FinDog is here to help! We use machine learning tools to match your dog's missing ad with someone that found your dog.
 
## Features

* Post and browse missing ads of lost dogs
* Post and browse reports of found dogs looking for their owners 
* Automatically match dog owner's missing ad and relevant found dogs reports, and notify the owner

## Architecture

### Front-End

We used React Native for the front-end and tried to follow the Material Design patterns with the design and icons.

### Back-End

We used Firebase's Firestore Database as our database, that stores the user's information, the uploaded missing ads and reports of found dogs, and other relevant information.
To send notifications, we used Firebase functions that are triggered when users upload a missing ad or a found dog report.
We also built an AI model using Vertex AI on the Google Cloud platform. The model is trained to classify dog photos by breed on [Stanford Dogs Dataset](http://vision.stanford.edu/aditya86/ImageNetDogs/).

### Main APIs

* Vertex AI - matching photos of missing dogs and dogs that were found.
* Expo Notifications - sending notifications to dog owners that lost their dog when someone finds a dog and it matches with the lost dog.
* Google Maps - selecting last seen location of missing and found dogs. Visualising and opening locations of missing ads and reports of found dogs.  

## Installation

You can install FinDog using [Google Play](https://play.google.com/store/games) (TODO:add link!)

## Usage Instructions