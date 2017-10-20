function showOfflineToast() {
 let offlineToast = document.querySelector('.offline-ready');
  offlineToast.classList.add('active');
  setTimeout(function(){ 
    offlineToast.className = offlineToast.className.replace("active", "").trim();
  }, 5500);
}
 
// (1)
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('{{ site.baseurl }}/sw.js').then(function(reg) {
      if (!reg.installing) return;
      console.log("[*] ServiceWorker is installing...");
 
      var worker = reg.installing;
 
      worker.addEventListener('statechange', function() {
          if (worker.state == 'redundant') {
              console.log('[*] Install failed');
          }
          if (worker.state == 'installed') {
              console.log('[*] Install successful!');
          }
          // (2)
          if (worker.state == 'activated' && !navigator.serviceWorker.controller) {
            showOfflineToast();
          }
      });
  });
}
