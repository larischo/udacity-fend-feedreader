/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         * -> Test fails if allFeeds is emtpy!
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have an url that is defined and not empty', function() {
            for (feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have a name that is defined and not empty', function() {
            for (feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            }
        });
    });


    /* New test suite for the menu. This suite is about hiding the menu 
     * by default and ensuring its proper behaviour
     */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('element is hidden by default', function() {
            expect($('body').attr('class')).toEqual('menu-hidden');
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            // trigger frist click -> body shoudn't have class
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toEqual('');
            // trigger second click -> body shoud have class
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toEqual('menu-hidden');
        });
    });

    /* New test suite named "Initial Entries" that contains a 
     * test that checks if there is at least one entry when the feed is loaded
     */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */  
         beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('are existing', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* New test suite named "New Feed Selection" that contains a 
     * test that checks if the content changes*/
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var content;

        beforeEach(function(done) {
            loadFeed(0,function() {
                // store content
                content = $('.feed').html();
                // get new feed
                loadFeed(1, done);
            });
        });    

        it('contains changes', function(done) {
            expect($('.feed').html()).not.toBe(content);
            done();
        });
    });    
}());
