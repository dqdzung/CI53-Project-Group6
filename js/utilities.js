export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function getDataFromDoc(doc, excepts = []) {
  let data = doc.data();
  data.id = doc.id;
  return data;
}

export function getDataFromDocs(docs, excepts = []) {
  return docs.map(function (doc) {
    return getDataFromDoc(doc, excepts);
  });
}

export function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number;
    return re.test(String(password).toLowerCase());
}

// Save current user info into localStorage
export function saveCurrentUser(user) {
  localStorage.setItem("current-user", JSON.stringify(user));
}

// Get current user info from localStorage
export function getCurrentUser() {
  let result = localStorage.getItem("current-user");

  if (result) {
    return JSON.parse(result);
  }
  return null;
}
