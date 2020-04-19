/*global chrome*/
export async function getData(key) {
  try {
    return await new Promise((resolve, reject) => {
      chrome.storage.local.get([`${key}`], function (result) {
        resolve(result);
      });
    });
  } catch (e) {
    console.log("getData error: ", e);
    return Promise.reject(e);
  }
}

export async function setData(obj) {
  try {
    return await new Promise((resolve, reject) => {
      chrome.storage.local.set(obj, function () {
        resolve();
      });
    });
  } catch (e) {
    console.log("getData error: ", e);
    return Promise.reject(e);
  }
}
