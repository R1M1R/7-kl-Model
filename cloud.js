'use strict';

(function () {
  const config = window.LAB_FIREBASE;
  let ready = null;
  let boardUnsub = null;
  let boardRoom = '';

  function enabled() {
    return !!(config && config.apiKey && config.projectId);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Не удалось загрузить Firebase'));
      document.head.appendChild(script);
    });
  }

  function ensure() {
    if (!enabled()) return Promise.resolve(false);
    if (ready) return ready;
    const base = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-';
    ready = loadScript(base + 'app-compat.js')
      .then(() => Promise.all([
        loadScript(base + 'auth-compat.js'),
        loadScript(base + 'firestore-compat.js'),
        loadScript(base + 'storage-compat.js')
      ]))
      .then(async () => {
        if (!firebase.apps.length) firebase.initializeApp(config);
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        return true;
      })
      .catch((error) => {
        ready = null;
        throw error;
      });
    return ready;
  }

  async function studentAuth() {
    const ok = await ensure();
    if (!ok) return null;
    const auth = firebase.auth();
    if (!auth.currentUser) await auth.signInAnonymously();
    return auth.currentUser;
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !/^image\//.test(file.type)) {
        reject(new Error('Нужна фотография, не другой файл'));
        return;
      }
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.onload = () => {
        const maxSide = 1280;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          if (!blob) reject(new Error('Не удалось сжать фото'));
          else if (blob.size > 1500000) reject(new Error('Фото слишком большое даже после сжатия'));
          else resolve(blob);
        }, 'image/jpeg', 0.72);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Фото не открывается'));
      };
      image.src = url;
    });
  }

  async function publish(payload) {
    const user = await studentAuth();
    if (!user) return { ok: false, reason: 'Журнал класса ещё не подключён' };
    const db = firebase.firestore();
    const stamp = firebase.firestore.FieldValue.serverTimestamp();
    const boardRef = db.collection('rooms').doc(payload.roomId).collection('board').doc(payload.studentId);
    const workRef = db.collection('rooms').doc(payload.roomId).collection('work').doc(payload.studentId);
    const existing = await boardRef.get();
    if (existing.exists && existing.data().uid && existing.data().uid !== user.uid) {
      return { ok: false, reason: 'Это имя уже записано с другого телефона. Попросите учителя открыть журнал.' };
    }
    await boardRef.set(Object.assign({}, payload.board, { uid: user.uid, updatedAt: stamp }), { merge: true });
    await workRef.set(Object.assign({}, payload.work, { uid: user.uid, updatedAt: stamp }), { merge: true });
    return { ok: true };
  }

  async function uploadPhoto(roomId, studentId, hwNumber, file) {
    const user = await studentAuth();
    if (!user) throw new Error('Журнал класса ещё не подключён');
    const blob = await compressImage(file);
    const ref = firebase.storage().ref(`rooms/${roomId}/${studentId}/hw${hwNumber}.jpg`);
    await ref.put(blob, { contentType: 'image/jpeg', customMetadata: { uid: user.uid } });
    return ref.getDownloadURL();
  }

  function watchBoard(roomId, onRows) {
    if (!enabled()) return Promise.resolve();
    if (boardUnsub && boardRoom === roomId) return Promise.resolve();
    if (boardUnsub) boardUnsub();
    boardRoom = roomId;
    return ensure().then(() => {
      boardUnsub = firebase.firestore().collection('rooms').doc(roomId).collection('board').onSnapshot((snap) => {
        const rows = [];
        snap.forEach((doc) => rows.push(Object.assign({ id: doc.id }, doc.data())));
        rows.sort((a, b) => (b.points || 0) - (a.points || 0) || (b.lessonsDone || 0) - (a.lessonsDone || 0) || String(a.lastName).localeCompare(String(b.lastName), 'ru'));
        onRows(rows);
      }, () => onRows([]));
    });
  }

  async function teacherLogin(email, password) {
    await ensure();
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  }

  function teacherActive() {
    const user = window.firebase && firebase.auth && firebase.auth().currentUser;
    return !!(user && !user.isAnonymous);
  }

  async function teacherJournal(roomId) {
    await ensure();
    if (!teacherActive()) throw new Error('Сначала войдите почтой учителя');
    const snap = await firebase.firestore().collection('rooms').doc(roomId).collection('work').get();
    const rows = [];
    snap.forEach((doc) => rows.push(Object.assign({ id: doc.id }, doc.data())));
    rows.sort((a, b) => String(a.lastName).localeCompare(String(b.lastName), 'ru'));
    return rows;
  }

  window.LabCloud = {
    enabled,
    publish,
    uploadPhoto,
    watchBoard,
    teacherLogin,
    teacherActive,
    teacherJournal
  };
}());
