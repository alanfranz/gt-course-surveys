(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('MsThemeOptionsController', MsThemeOptionsController);

  /** @ngInject */
  function MsThemeOptionsController($window, $cookies, fuseTheming) {
    const vm = this;

    // Data

    vm.themes = fuseTheming.themes;

    vm.layoutModes = [{
      label: 'Boxed',
      value: 'boxed'
    }, {
      label: 'Wide',
      value: 'wide'
    }];

    vm.layoutStyles = [{
      label: 'Vertical Navigation 1',
      value: 'verticalNavigation',
      figure: '/assets/images/theme-options/vertical-nav.jpg'
    }, {
      label: 'Vertical Navigation 2',
      value: 'verticalNavigationFullwidthToolbar',
      figure: '/assets/images/theme-options/vertical-nav-with-full-toolbar.jpg'
    }, {
      label: 'Vertical Navigation 3',
      value: 'verticalNavigationFullwidthToolbar2',
      figure: '/assets/images/theme-options/vertical-nav-with-full-toolbar-2.jpg'
    }, {
      label: 'Content w/Toolbar',
      value: 'contentWithToolbar',
      figure: '/assets/images/theme-options/content-with-toolbar.jpg'
    }, {
      label: 'Content Only',
      value: 'contentOnly',
      figure: '/assets/images/theme-options/content-only.jpg'
    }];

    vm.layoutMode = 'wide';
    vm.layoutStyle = $cookies.get('ls') || 'verticalNavigation';

    // Methods

    vm.setActiveTheme = setActiveTheme;
    vm.getActiveTheme = getActiveTheme;
    vm.updateLayoutMode = updateLayoutMode;
    vm.updateLayoutStyle = updateLayoutStyle;

    //////////

    function setActiveTheme(themeName) {
      fuseTheming.setActiveTheme(themeName);
    }

    function getActiveTheme() {
      return fuseTheming.themes.active;
    }

    function updateLayoutMode() {
      angular.element('body').toggleClass('boxed', (vm.layoutMode === 'boxed'));
    }

    function updateLayoutStyle() {
      $cookies.put('ls', vm.layoutStyle);
      $window.location.reload();
    }
  }
})();
