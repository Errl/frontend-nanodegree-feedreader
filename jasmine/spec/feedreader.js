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
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        /* Fixed length from not.toBe(0) to toBeGreaterThan(0)*/
        it('has url', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        /*This checks to see if the body has a clas of menu-hidden, then we know the menu is hidden*/
        it('is hidden', function () {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        /*We have two expectations. we click the menu icon and see if the menu-hodden class has been removed from body. Then we click the icon again and make sure it was put back.*/
        it('shows menu when clicked', function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger("click");
            expect($("body").hasClass("menu-hidden")).not.toBe(true);
        });

        it('hides menu when clicked', function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        /*Here we load the first feed in the allFeeds array*/
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        /*Here we make sure that the feed entry is not zero and it contains a feed*/
        it('have at least 1 entry', function () {
            expect($(".feed .entry-link").length).not.toBe(0);
        });
    });

    ///* TODO: Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function() {

    //    /* TODO: Write a test that ensures when a new feed is loaded
    //    * by the loadFeed function that the content actually changes.
    //    * Remember, loadFeed() is asynchronous.
    //    */
        var feed;
        /*First we set the variable feed to the first entry in the feed list. 
         * Then we call the loadFeed function and load the second feed in our all feeds array.
         */
        beforeEach(function (done) {
            // get the content of the first feed entry
            feed = $('.feed .entry-link').first().text();
            // make a call to the css tricks feed url
            loadFeed(1, done);
        });
        /*Now we load the first entry of the new feed and make sure it doesnt match the first entry of the old feed*/
        it("feed content has changed", function (done) {
            // get the content of the first feed entry AFTER the call
            var newFeed = $('.feed .entry-link').first().text();
            // check that both items are not matching
            expect(feed).not.toMatch(newFeed);
            done();
        });
        /*Here I execute the loadFeed function on the first feed in the allFeeds array, to set the home page back to the original feed.*/
        afterAll(function (done) {
            loadFeed(0, done);
        });
    });
}());
