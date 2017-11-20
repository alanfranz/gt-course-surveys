(function () {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $timeout, $state, $stateParams, $mdDialog, $mdToast, msNavigationService, Logger, gtConfig) {
    const stateChangeStart = $rootScope.$on('$stateChangeStart', () => {
      $rootScope.loadingProgress = true;

      $mdDialog.cancel();
      $mdToast.hide();
    });

    const stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', () => {
      $timeout(() => {
        $rootScope.loadingProgress = false;
      });
    });

    const stateChangeError = $rootScope.$on('$stateChangeError', (event, toState, toStateParams, fromState, fromStateParams, error) => {
      switch (error) {
        case gtConfig.code.error.HTTP_401:
          $state.go('app.main_pages_auth_login');
          break;

        case gtConfig.code.error.HTTP_404:
          $state.go('app.main_pages_errors_404');
          break;

        case gtConfig.code.error.HTTP_500:
          $state.go('app.main_pages_errors_500');
          break;

        default:
          $state.go('app.main_pages_errors_500');
          Logger.log(Logger.Type.Error, error);
          break;
      }
    });

    $rootScope.state = $state;

    $rootScope.$on('$destroy', () => {
      stateChangeStart();
      stateChangeSuccess();
      stateChangeError();
    });

    // firebase.initializeApp(gtConfig.firebase);
  }
})();
