/* ═══════════════════════════════════════════
   MODULES/share.js - Social Sharing
   ═══════════════════════════════════════════ */

window.Share = {
  website: function() {
    var shareData = {
      title: 'SabziBuddy',
      text: 'Order fresh vegetables and groceries!',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(function() {});
    } else {
      this._copyToClipboard(shareData.url);
      Toast.success('Link copied to clipboard');
    }
  },

  suggestProduct: function(name, description) {
    var phone = '917900684615';
    var text = 'Hi! I would like to suggest a product:%0A%0A*Name:* ' + encodeURIComponent(name) +
      '%0A*Description:* ' + encodeURIComponent(description);
    window.open('https://wa.me/' + phone + '?text=' + text, '_blank');
  },

  _copyToClipboard: function(text) {
    var el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};
