'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.directives'
])

  .config(['$locationProvider', '$routeProvider', AppConfig])
  .factory('AppData', AppData)
  .controller('AppCtrl', AppCtrl)



function AppConfig($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({ redirectTo: '/init' });
}

function AppCtrl($scope, AppData) {
  $scope.showMenu = true;
  $scope.showConfig = false;
  $scope.dataLength = AppData.getDataLength();
  
  $scope.displayMenu = function () {
    $scope.showMenu = !$scope.showMenu;
  }

  $scope.displayConfig = function () {
    $scope.showConfig = !$scope.showConfig;
  }

  $scope.activeItem = function (idx) {
    $scope.setActiveItem('item-menu-', idx, $scope.menuItems.length)
  }

  $scope.setData = function (idx) {
    AppData.setData(idx);
    $scope.init();
    $scope.setActiveItem('item-config-', idx, $scope.dataLength)
    $scope.$broadcast('ChangeData', $scope.sectionsItems );
  }

  $scope.getMenu = function () {
    $scope.menuItems = AppData.getMenu();
  }

  $scope.getSections = function () {
    $scope.sectionsItems = AppData.getSections();
  }

  $scope.setActiveItem = function (item, idx, items) {
    for (var i = 0; i < items; i++) {
      if (i === idx) {
        document.getElementById(item + i).className = 'active'
      }
      else {
        document.getElementById(item + i).className = ''
      }
    }
  }

  $scope.init = function(){
    $scope.getMenu();
    $scope.getSections();
  }

  $scope.init();

  window.onload= function() {
    $scope.setActiveItem('item-menu-', 0, $scope.menuItems.length)
    $scope.setActiveItem('item-config-', 0, $scope.dataLength)
  };
  
}

function AppData() {
  var config = {};
  
  var dataJson = [
    {
      menu: ["Desarrollo", "Administración", "Seguridad"],
      sections: [
        {
          name: "Relevamiento",
          kpis: [
            { name: "Documentos", limit: 4, unit: "u", value: 7 },
            { name: "Desvíos", limit: 5, unit: "%", value: 14 }
          ]
        },
        {
          name: "Desarrollo",
          kpis: [
            { name: "Desvíos", limit: 20, unit: "u", value: 14 }
          ]
        },
        {
          name: "Implementación",
          kpis: [
            { name: "Implementaciones", limit: 20, unit: "u", value: 7 },
            { name: "Tasa de Reimpl.", limit: 10, unit: "%", value: 11 },
            { name: "Lorem", limit: 20, unit: "%", value: 14 },
            { name: "Ipsum", limit: 5, unit: "%", value: 4 },
            { name: "Lorem", limit: 7, unit: "%", value: 6 },
          ]
        },

      ]
    },
    {
      menu: ["Producción", "Calidad"],
      sections: [
        {
          name: "Logística",
          kpis: [
            { name: "Accidentes", limit: 0, unit: "p", value: 1 },
            { name: "Cal.Sec.RB", limit: 95, unit: "%", value: 88 },
            { name: "Cal.Sec.LK", limit: 85, unit: "%", value: 89 },
            { name: "Cal.Sec.MO", limit: 75, unit: "%", value: 78 },
            { name: "Ab. Tardío", limit: 18, unit: "u", value: 14 }
          ]
        },
        {
          name: "Montaje",
          kpis: [
            { name: "Accidentes", limit: 0, unit: "p", value: 0 },
            { name: "GAL", limit: 85, unit: "%", value: 90 },
            { name: "CPA", limit: 24, unit: "pt", value: 22 },
            { name: "Entrega", limit: 80, unit: "u", value: 78 },
            { name: "Circulante", limit: 11, unit: "u", value: 14 }
          ]
        }
      ]
    }
  ]
  
  var toAddData = [
    { name: "P. Dañadas", limit: 5, unit: "u", value: 3 },
    { name: "Ausencias", limit: 10, unit: "p", value: 12 },
    { name: "Fallas", limit: 3, unit: "u", value: 0 },
    { name: "P. en Almacen", limit: 99, unit: "u", value: 75 },
    { name: "Incidencias", limit: 14, unit: "u", value: 7 },
    { name: "Rotación", limit: 15, unit: "u", value: 10 },
    { name: "Detenidas", limit: 5, unit: "u", value: 1 },
    { name: "Eq Dañado", limit: 6, unit: "u", value: 7 },
    { name: "Sobrantes", limit: 0, unit: "u", value: 0 },
    { name: "Faltantes", limit: 0, unit: "u", value: 4 },
    { name: "% de Prod", limit: 95, unit: "%", value: 70 },
    { name: "% Ausencias", limit: 5, unit: "%", value: 8 }
  ]
  config.data = dataJson[0]

  config.setData = function (idx) {
    config.data = dataJson[idx];
  }

  config.showBtnAdd = function(addIdx){
    return addIdx+1 !== toAddData.length;
  }

  config.addData = function(idx, addIdx){
    config.data.sections[idx].kpis.push(toAddData[addIdx])
    return config.data.sections[idx].kpis;
  }

  config.getDataLength = function () {
    return dataJson.length;
  }

  config.getMenu = function () {
    return config.data.menu;
  }

  config.getSections = function () {
    return config.data.sections;
  }

  return config
};
