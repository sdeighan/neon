'use strict';
/*
 * Copyright 2014 Next Century Corporation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/**
 * This provides a bare-bones controller for the primary portion of index.html, the main page of the 
 * application.
 *
 * @class neonDemo.controllers.neonDemoController
 * @constructor
 */
angular.module('neonDemo.controllers', []).controller('neonDemoController', ['$scope', '$timeout', 'FilterCountService',
	function($scope, $timeout, filterCountService) {

		$scope.seeData = false;
        $scope.createFilters = false;
        $scope.filterCount = 0;

        /**
         * Simple toggle method for tracking whether or not the create filters tray should be visible.
         * At present, this is used to sync an angular scope variable with the collapsed state of a div
         * whose visiblity is managed by Bootstrap hooks.
         * @method toggleCreateFilters
         */
        $scope.toggleCreateFilters = function() {
            $scope.createFilters = !$scope.createFilters;
            XDATA.activityLogger.logUserActivity('Neon Demo - Toggle custom filter display', 'click',
                XDATA.activityLogger.WF_EXPLORE,
                {
                    from: !$scope.createFilters,
                    to: $scope.createFilters
                });

            if ($scope.createFilters && $scope.seeData) {
                // using timeout here to execute a jquery event outside of apply().  This is necessary
                // to avoid the event occuring within an apply() cycle and triggering another
                // update which calls apply() since the side-effects of the click would change
                // things that are watched in index.html.
                $timeout(function() {
                    $($("[href='.data-tray']")[0]).click();  
                }, 5, false);
                
            }
        };

        /**
         * Simple toggle method for tracking whether or not the data table tray should be visible.
         * At present, this is used to sync an angular scope variable with the collapsed state of a div
         * whose visiblity is managed by Bootstrap hooks.
         * @method toggleSeeData
         */
		$scope.toggleSeeData = function() {
			$scope.seeData = !$scope.seeData;
            XDATA.activityLogger.logUserActivity('Neon Demo - Toggle data table display', 'click',
                XDATA.activityLogger.WF_EXPLORE,
                {
                    from: !$scope.seeData,
                    to: $scope.seeData
                });

            if ($scope.createFilters && $scope.seeData) {
                // using timeout here to execute a jquery event outside of apply().  This is necessary
                // to avoid the event occuring within an apply() cycle and triggering another
                // update which calls apply() since the side-effects of the click would change
                // things that are watched in index.html.
                $timeout(function() {
                    $($("[href='.filter-tray']")[0]).click();  
                }, 5, false);
            }
		};

		// Watch for changes in the filter counts and update the filter badge binding.
        $scope.$watch(function() {
        	return filterCountService.getCount();
        }, function(count) {
            $scope.filterCount = count;
        });

        $scope.$watch('chartType', function(newVal, oldVal) {
            XDATA.activityLogger.logUserActivity('Neon Demo - Select chart type', 'select',
                XDATA.activityLogger.WF_CREATE,
                {
                    from: oldVal,
                    to: newVal
                });
        });

        $scope.$watch('barType', function(newVal, oldVal) {
            XDATA.activityLogger.logUserActivity('Neon Demo - Select aggregation type', 'select',
                XDATA.activityLogger.WF_CREATE,
                {
                    from: oldVal,
                    to: newVal
                });
        });

	}]);
