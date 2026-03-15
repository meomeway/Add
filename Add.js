(function () {
  'use strict';

  Lampa.Platform.tv();

  function initPlugin() {
    Lampa.Listener.follow('request_secuses', function (event) {
      if (event.data.blocked) {
        var activity = Lampa.Activity.active();

        activity.source = 'tmdb';
        Lampa.Storage.set('activity', activity, true);
        Lampa.Activity.replace(activity);
        Lampa.Storage.set('source', 'cub', true);
      }
    });

    var timer = setInterval(function () {
      if (
        typeof window.lampa_settings !== 'undefined' &&
        (window.lampa_settings.blocked || window.lampa_settings.fixdcma)
      ) {
        clearInterval(timer);

        if (window.lampa_settings.blocked) {
          window.lampa_settings.blocked = false;
        }
      }
    }, 100);
  }

  if (window.appready) {
    initPlugin();
  } else {
    Lampa.Listener.follow('app', function (event) {
      if (event.type === 'ready') {
        initPlugin();
      }
    });
  }
})();
