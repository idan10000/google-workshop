import {collection, getFirestore, getDocs, getDoc, doc, query, orderBy, startAfter, limit} from "firebase/firestore";
import {fireStoreDB} from "../../shared_components/Firebase";
import {useEffect} from "react";
import {distanceBetween} from "geofire-common";


const extractSnapshotsAndGetDistance = (snapshots, currentLocation) => {
    let extracts = [];
    snapshots.forEach((documentSnapshot) => {
        const data = documentSnapshot.data();
        data.distance = distanceBetween([data.location.latitude, data.location.longitude], currentLocation)
        extracts.push(data);
    });
    return extracts;
};

export const getDocuments = async ({lastDocId, lim = 10, path, currentLocation}) => {
    let docs = []; // Array of docs in current bath
    let newLastDocId = null; // Last document ID in this batch
    let error = null;
    let batch;

    const db = fireStoreDB
    const reportsRef = collection(db, path);
    /***
     *  Fetching  documents is asynchronous operation,  It's good practice to
     *  to monitor each status of operation. Status should be UNDETERMINED, PENDING, SUCCEEDED
     *  or FAILED.
     */
    let status = "undetermined";

    try {
        /***
         * In case lastDocId provided, start after that document, otherwise
         * start on first document.
         */

        if (lastDocId) {

            const lastDoc = await getDoc(doc(db, lastDocId)).catch(error => {
                console.log("error getting last doc")
                console.log(error)
            });

            /**
             *  Read more about Firestore paginated query here
             *  https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
             */
            batch = query(reportsRef, orderBy("date", "desc"), startAfter(lastDoc), limit(lim));

        } else {

            /**
             *  The {lastDocId} not provided. Start on first document in collection
             */
            batch = query(reportsRef, orderBy("date", "desc"), limit(lim));
        }

        status = "pending";

        const snapshots = await getDocs(batch).catch(error => {
            console.log("error getting snapshot of docs")
            console.log(error)
        });
        /**
         *  For current batch, keep lastDocId to be used in next batch
         *  as starting point.
         */

        newLastDocId =
            snapshots.docs[snapshots.docs.length - 1]?.ref.path || null;


        docs = extractSnapshotsAndGetDistance(snapshots,currentLocation);
        status = "succeeded";

        return {
            status,
            error,
            docs,
            lastDocId: newLastDocId,
        };
    } catch (error) {
        console.log("error at getDocuments: ")
        console.log(error)
        status = "failed";
        return {
            status,
            error: error,
            docs,
            lastDocId: newLastDocId,
        };
    }
};

/** Fetch initial batch docs and save last document ID */
export const getInitialData = async (setData, path, currentLocation) => {
    console.log("getInitialData called")
    setData({initialBatchStatus: "pending", error: null});
    const {
        docs,
        error,
        lastDocId,
        status: initialBatchStatus,
    } = await getDocuments({lim: 10, path: path, currentLocation:currentLocation});
    if (error) {
        console.log("error retrieving initial data: " + error)
        return setData({initialBatchStatus, error});
    }
    return setData({initialBatchStatus, docs, lastDocId});
};


/*
* Fetch next batch of documents start from {lastDocId}
*/
export const getNextData = async (data, setData, path, currentLocation) => {
    console.log(data)
    console.log("getting next data")
    // Discard next API call when there's pending request
    if (data.nextBatchStatus === "pending" || !data.lastDocId) return;

    console.log("before pending")

    setData({...data, nextBatchStatus: "pending", error: null});
    console.log("after pending")
    const {
        docs,
        error,
        lastDocId,
        status: nextBatchStatus,
    } = await getDocuments({lim: 6, lastDocId: data.lastDocId, path: path,currentLocation:currentLocation});
    console.log("after getting docs")

    if (error) {
        console.log(error)
        return setData({nextBatchStatus, error});
    }

    const newDocs = [...data.docs].concat(docs);
    setData({...data, nextBatchStatus, docs: newDocs, lastDocId});
};
