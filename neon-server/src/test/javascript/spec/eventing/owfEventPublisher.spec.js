/*
 * ************************************************************************
 * Copyright (c), 2013 Next Century Corporation. All Rights Reserved.
 *
 * This software code is the exclusive property of Next Century Corporation and is
 * protected by United States and International laws relating to the protection
 * of intellectual property.  Distribution of this software code by or to an
 * unauthorized party, or removal of any of these notices, is strictly
 * prohibited and punishable by law.
 *
 * UNLESS PROVIDED OTHERWISE IN A LICENSE AGREEMENT GOVERNING THE USE OF THIS
 * SOFTWARE, TO WHICH YOU ARE AN AUTHORIZED PARTY, THIS SOFTWARE CODE HAS BEEN
 * ACQUIRED BY YOU "AS IS" AND WITHOUT WARRANTY OF ANY KIND.  ANY USE BY YOU OF
 * THIS SOFTWARE CODE IS AT YOUR OWN RISK.  ALL WARRANTIES OF ANY KIND, EITHER
 * EXPRESSED OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE HEREBY EXPRESSLY
 * DISCLAIMED.
 *
 * PROPRIETARY AND CONFIDENTIAL TRADE SECRET MATERIAL NOT FOR DISCLOSURE OUTSIDE
 * OF NEXT CENTURY CORPORATION EXCEPT BY PRIOR WRITTEN PERMISSION AND WHEN
 * RECIPIENT IS UNDER OBLIGATION TO MAINTAIN SECRECY.
 */

describe('publishing events to OWF channels', function () {

    /** a mock method that stands in for the OWF channel publish method */
    var publishMock;

    /** saves the original publish method so it can be restored at the end of the test */
    var originalPublishMethod = OWF.Eventing.publish;

    var owfEventPublisher;
    var messageHandler;

    var databaseName = 'mockDatabaseName';
    var tableName = 'mockTableName';

    beforeEach(function () {
        publishMock = jasmine.createSpy('message publisher');
        OWF.Eventing.publish = publishMock;
    });

    afterEach(function () {
        // no good way way to do this only once after the whole test suite
        OWF.Eventing.publish = originalPublishMethod;
    });

    /**
     * Executes a query method and tests that the results are published to the specified channel
     * @param channel The channel the message should be published to
     * @param queryExecutorMethod The query executor method to execute
     * @param args The args to that query method
     * @param delegateMethodName The underlying query method to which the OWF query executor delegates its calls to. This
     * is used to ensure that the correct method is actually called.
     */
    function testResultsPublishedToChannel(channel, queryExecutorMethod, args, delegateMethodName) {
        // not all of the real methods actually return any results , but for this test it doesn't matter
        var mockResults = {mock: "results"};
        var delegateSpy = spyOn(neon.query, delegateMethodName).andCallThrough();
        neon.mock.AjaxMockUtils.mockNextAjaxCall(mockResults);
        queryExecutorMethod.apply(args);
        var expectedArgs = {};
        _.extend(expectedArgs, mockResults);
        // the owf query executor appends a source, so add it here
        expect(publishMock).toHaveBeenCalledWith(channel, expectedArgs);

        // verify that the correct delegate method on the query executor was actually called
        expect(delegateSpy).toHaveBeenCalled();
    }


    it('should publish add filter results', function () {
        var filterKey = {
            uuid: "84bc5064-c837-483b-8454-c8c72abe45f8",
            dataSet: {
                databaseName: databaseName,
                tableName: tableName
            }
        };
        var filter = new neon.query.Filter().selectFrom(databaseName, tableName);
        testResultsPublishedToChannel(
            neon.eventing.channels.FILTERS_CHANGED,
            neon.eventing.publishing.addFilter,
            [filterKey, filter],
            'addFilter'
        );
    });

    it('should publish remove filter results', function () {
        testResultsPublishedToChannel(
            neon.eventing.channels.FILTERS_CHANGED,
            neon.eventing.publishing.removeFilter,
            ["filterId"],
            'removeFilter'
        );
    });

    it('should publish clear filter results', function () {

        testResultsPublishedToChannel(
            neon.eventing.channels.FILTERS_CHANGED,
            neon.eventing.publishing.clearFilters,
            [],
            'clearFilters'
        );
    });

    it('should publish set selection by filter', function () {
        var filter = new neon.query.Filter().selectFrom(databaseName, tableName);
        testResultsPublishedToChannel(
            neon.eventing.channels.SELECTION_CHANGED,
            neon.eventing.publishing.setSelectionWhere,
            [filter],
            'setSelectionWhere'
        );
    });

    it('should publish set selection by ids', function () {
        testResultsPublishedToChannel(
            neon.eventing.channels.SELECTION_CHANGED,
            neon.eventing.publishing.setSelectedIds,
            [
                ["id"]
            ],
            'setSelectedIds'
        );
    });

    it('should publish add selection ids', function () {
        testResultsPublishedToChannel(
            neon.eventing.channels.SELECTION_CHANGED,
            neon.eventing.publishing.addSelectedIds,
            [
                ["id"]
            ],
            'addSelectedIds'
        );
    });

    it('should publish remove selection ids', function () {
        testResultsPublishedToChannel(
            neon.eventing.channels.SELECTION_CHANGED,
            neon.eventing.publishing.removeSelectedIds,
            [
                ["id"]
            ],
            'removeSelectedIds'
        );
    });

    it('should publish clear selection', function () {
        testResultsPublishedToChannel(
            neon.eventing.channels.SELECTION_CHANGED,
            neon.eventing.publishing.clearSelection,
            [
                ["id"]
            ],
            'clearSelection'
        );
    });
});