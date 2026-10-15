'use strict';

(function () {
  const config = window.LAB_FIREBASE;
  let ready = null;
  let boardUnsub = null;
  let boardKey = '';

  function enabled() {
    return !!(config && config.apiKey && config.projectId && config.databaseURL);
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
        loadScript(base + 'database-compat.js'),
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
    if (!auth.currentUser || !auth.currentUser.isAnonymous) {
      if (auth.currentUser && !auth.currentUser.isAnonymous) await auth.signOut();
      await auth.signInAnonymously();
    }
    return auth.currentUser;
  }

  function root() {
    return firebase.database().ref();
  }

  async function publish(payload) {
    const user = await studentAuth();
    if (!user) return { ok: false, reason: 'Журнал класса ещё не подключён' };
    const room = payload.roomId;
    const groupId = String(payload.groupId || '1');
    const id = payload.studentId;
    const existing = await root().child(`classes/${room}/boardByGroup/${groupId}/${id}`).get();
    if (existing.exists() && existing.val().uid && existing.val().uid !== user.uid) {
      return { ok: false, reason: 'Это имя уже записано с другого телефона.' };
    }
    const stamp = firebase.database.ServerValue.TIMESTAMP;
    const board = Object.assign({}, payload.board, { uid: user.uid, groupId, updatedAt: stamp });
    const work = Object.assign({}, payload.work, { uid: user.uid, groupId, updatedAt: stamp });
    await root().update({
      [`users/${user.uid}`]: { classId: room, groupId, role: 'student' },
      [`classes/${room}/boardByGroup/${groupId}/${id}`]: board,
      [`classes/${room}/workByGroup/${groupId}/${id}`]: work
    });
    return { ok: true };
  }

  function watchBoard(roomId, groupId, onRows) {
    if (!enabled()) return Promise.resolve();
    const key = roomId + '/' + groupId;
    if (boardUnsub && boardKey === key) return Promise.resolve();
    if (boardUnsub) boardUnsub();
    boardKey = key;
    return ensure().then(() => studentAuth()).then(() => {
      const ref = root().child(`classes/${roomId}/boardByGroup/${groupId}`);
      const handler = (snap) => {
        const rows = [];
        snap.forEach((child) => rows.push(Object.assign({ id: child.key }, child.val())));
        rows.sort((a, b) => (b.points || 0) - (a.points || 0) || String(a.lastName).localeCompare(String(b.lastName), 'ru'));
        onRows(rows);
      };
      ref.on('value', handler);
      boardUnsub = () => ref.off('value', handler);
    }).catch(() => onRows([]));
  }

  async function teacherLogin(email, password, create) {
    await ensure();
    const auth = firebase.auth();
    if (auth.currentUser && auth.currentUser.isAnonymous) await auth.signOut();
    if (create) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        if (error.code !== 'auth/email-already-in-use') throw error;
        await auth.signInWithEmailAndPassword(email, password);
      }
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
    return auth.currentUser;
  }

  async function claimMaster(roomId, name) {
    await ensure();
    const user = firebase.auth().currentUser;
    if (!user || user.isAnonymous) throw new Error('Сначала войдите почтой учителя');
    await root().child(`classes/${roomId}/masters/${user.uid}`).set({
      email: user.email,
      name,
      role: 'master'
    });
    await root().child(`classes/${roomId}/meta`).set({
      author: 'Усеинов Эмир Рустемович',
      title: roomId
    });
    await root().child(`classes/${roomId}/groups`).update({
      1: { title: 'Группа 1' },
      2: { title: 'Группа 2' },
      3: { title: 'Группа 3' }
    });
    return user.uid;
  }

  async function grantTeacher(roomId, teacherUid, groups) {
    await ensure();
    const user = firebase.auth().currentUser;
    if (!user || user.isAnonymous) throw new Error('Сначала войдите почтой ведущего');
    const map = {};
    groups.forEach((groupId) => { map[groupId] = true; });
    await root().child(`classes/${roomId}/teachers/${teacherUid}`).set({
      groups: map,
      role: 'teacher',
      grantedBy: user.uid
    });
  }

  async function myAccess(roomId) {
    await ensure();
    const user = firebase.auth().currentUser;
    if (!user || user.isAnonymous) return { role: 'none', uid: user ? user.uid : '', groups: [] };
    const master = await root().child(`classes/${roomId}/masters/${user.uid}`).get();
    if (master.exists()) return { role: 'master', uid: user.uid, groups: ['1', '2', '3'] };
    const teacher = await root().child(`classes/${roomId}/teachers/${user.uid}`).get();
    if (!teacher.exists()) return { role: 'none', uid: user.uid, groups: [] };
    const groups = Object.keys((teacher.val() && teacher.val().groups) || {}).filter((id) => teacher.val().groups[id]);
    return { role: 'teacher', uid: user.uid, groups };
  }

  async function teacherJournal(roomId) {
    const access = await myAccess(roomId);
    if (access.role === 'none') throw new Error('Нет доступа к этому классу. Ведущий должен выдать вам группы.');
    const rows = [];
    for (const groupId of access.groups) {
      const snap = await root().child(`classes/${roomId}/workByGroup/${groupId}`).get();
      snap.forEach((child) => rows.push(Object.assign({ id: child.key, groupId }, child.val())));
    }
    rows.sort((a, b) => String(a.groupId).localeCompare(String(b.groupId)) || String(a.lastName).localeCompare(String(b.lastName), 'ru'));
    return { access, rows };
  }

  async function uploadPhoto(roomId, studentId, hwNumber, file) {
    const user = await studentAuth();
    if (!user) throw new Error('Журнал класса ещё не подключён');
    if (!config.storageBucket) throw new Error('Хранилище фото ещё не включено');
    const blob = await compressImage(file);
    const ref = firebase.storage().ref(`rooms/${roomId}/${studentId}/hw${hwNumber}.jpg`);
    await ref.put(blob, { contentType: 'image/jpeg', customMetadata: { uid: user.uid } });
    return ref.getDownloadURL();
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !/^image\//.test(file.type)) {
        reject(new Error('Нужна фотография'));
        return;
      }
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.onload = () => {
        const scale = Math.min(1, 1280 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          if (!blob) reject(new Error('Не удалось сжать фото'));
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

  window.LabCloud = {
    enabled,
    publish,
    watchBoard,
    teacherLogin,
    claimMaster,
    grantTeacher,
    myAccess,
    teacherJournal,
    uploadPhoto
  };
}());
