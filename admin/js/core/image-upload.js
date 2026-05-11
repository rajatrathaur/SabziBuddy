/* ═══════════════════════════════════════════
   ADMIN/core/image-upload.js - Image Upload
   ═══════════════════════════════════════════ */

window.ImageUpload = {
  slots: ['', '', '', '', ''],

  handleFile: function(slotIndex, file) {
    if (!file) return;
    var path = 'products/' + Date.now() + '_' + file.name;
    var ref = storage.ref(path);
    var task = ref.put(file);

    return new Promise(function(resolve, reject) {
      task.on('state_changed',
        function(snap) {
          var pct = (snap.bytesTransferred / snap.totalBytes) * 100;
          var bar = document.getElementById('upload-progress-' + slotIndex);
          if (bar) bar.style.width = pct + '%';
        },
        function(err) { reject(err); },
        function() {
          task.snapshot.ref.getDownloadURL().then(function(url) {
            ImageUpload.slots[slotIndex] = url;
            resolve(url);
          });
        }
      );
    });
  },

  deleteFromSlot: function(slotIndex) {
    var url = this.slots[slotIndex];
    if (!url) return Promise.resolve();
    this.slots[slotIndex] = '';
    var ref = storage.refFromURL(url);
    return ref.delete().catch(function() {});
  },

  clearSlots: function() { this.slots = ['', '', '', '', '']; },

  getSlotUrls: function() { return this.slots.filter(function(u) { return !!u; }); }
};
