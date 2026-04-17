import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCr_2lW9AiylWS9RiaGP_ruIHNpGlTN2CI",
  authDomain: "stories-luzzzen.firebaseapp.com",
  databaseURL: "https://stories-luzzzen-default-rtdb.firebaseio.com",
  projectId: "stories-luzzzen",
  storageBucket: "stories-luzzzen.firebasestorage.app",
  messagingSenderId: "972275961682",
  appId: "1:972275961682:web:573c4901e1685b82c2b48b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// FUNCIONES GLOBALES
window.addDownload = async function(id) {
  const refDb = ref(db, 'downloads/' + id);

  const snapshot = await get(refDb);

  let current = 0;
  if (snapshot.exists()) {
    current = snapshot.val();
  }

  await set(refDb, current + 1);
};

window.handleDownload = async function(e, id, url) {
  e.preventDefault();
  await window.addDownload(id);
  window.location.href = url;
};

window.showDownloads = async function(id) {
  const refDb = ref(db, 'downloads/' + id);
  const snapshot = await get(refDb);

  if (snapshot.exists()) {
    const value = snapshot.val();
    const el = document.getElementById("count-" + id);

    if (el) {
      el.textContent = value + " descargas";
    }
  }
};
