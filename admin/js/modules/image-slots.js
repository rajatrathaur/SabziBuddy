/* ═══════════════════════════════════════════
   ADMIN/modules/image-slots.js - Image Slots
   ═══════════════════════════════════════════ */

window.ImageSlots = {
  init: function() {
    document.querySelectorAll('.img-slot-input').forEach(function(input) {
      input.addEventListener('change', function() {
        var slot = parseInt(this.dataset.slot);
        var file = this.files[0];
        if (file) ImageUpload.handleFile(slot, file);
      });
    });
  },

  populate: function(urls) {
    urls = urls || [];
    urls.forEach(function(url, i) {
      var slot = document.querySelector('.img-slot[data-slot="' + i + '"]');
      if (slot && url) slot.innerHTML = '<img src="' + url + '"><span class="slot-num">' + (i + 1) + '</span>';
    });
    ImageUpload.slots = urls.concat(['', '', '', '', '']).slice(0, 5);
  },

  clear: function() {
    document.querySelectorAll('.img-slot').forEach(function(slot) {
      slot.innerHTML = '<span class="slot-num">' + (parseInt(slot.dataset.slot) + 1) + '</span>+';
    });
    ImageUpload.clearSlots();
  }
};
