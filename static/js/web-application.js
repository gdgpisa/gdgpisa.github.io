function showOfflineToast() {
	if (navigator.serviceWorker) {
  		navigator.serviceWorker.register('https://gdgpisa.it/sw.js').then(function(reg) {
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
          		if (worker.state == 'activated' && !navigator.serviceWorker.controller) {
            		showOfflineToast();
          		}
      		});
  		});
	}
}
