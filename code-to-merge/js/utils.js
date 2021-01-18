export function getDataFromDoc(doc, excepts = []) {
    let data = doc.data();
    data.id = doc.id;
    return data;
};

export function getDataFromDocs(docs, excepts = []) {
    return docs.map(function(doc) {
        return getDataFromDoc(doc, excepts);
    });
};
