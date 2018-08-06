'use strict';

angular.module('myApp.directives', [])

    .directive('sectionBar', function () {
        return {
            restrict: 'A',
            templateUrl: './directives/section-bar/section-bar.html',
            scope: {
                sections: '=',
                kpis: '='
            },
            controller: function ($scope, AppData) {
                var addIdx = 0;
                $scope.showBtn = true;
                
                $scope.setActive = function (idx) {
                    $scope.sections.forEach(function (section, index) {
                        if (index === idx) {
                            $scope.sections[index].active = true;
                        }
                        else {
                            $scope.sections[index].active = false;
                        }
                    });
                    $scope.sectionSelected = $scope.sections[idx].kpis;
                    $scope.sectionId = idx;
                }

                $scope.addKpi = function () {
                    $scope.sectionSelected = AppData.addData($scope.sectionId, addIdx);
                    $scope.showBtn = AppData.showBtnAdd(addIdx);
                    addIdx++;
                }
                
                $scope.setActive(0);

                $scope.$on('ChangeData', function(evt, newSections) { 
                    $scope.sections = newSections
                    $scope.setActive(0)
                 });
            }
        };
    });