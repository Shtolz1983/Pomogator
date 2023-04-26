function addStorage({ role, content }) {
  if (!sessionStorage.getItem("messages")) {
    const storage = [];
    storage.push({ role: "system", content: "You are a helpful assistant." });
    sessionStorage.setItem("messages", JSON.stringify(storage));
  }
  const storage = JSON.parse(sessionStorage.getItem("messages"));
  storage.push({ role, content });
  sessionStorage.setItem("messages", JSON.stringify(storage));
}

function getStorage() {
  if (!sessionStorage.getItem("messages")) {
    const storage = [];
    storage.push({ role: "system", content: "You are a helpful assistant." });
    sessionStorage.setItem("messages", JSON.stringify(storage));
  }
  const storage = JSON.parse(sessionStorage.getItem("messages"));
  return storage;
}

module.exports = { addStorage, getStorage };
