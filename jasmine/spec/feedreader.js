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
    it('should be defined', function() {

      // The allFeeds variable should be defined
      expect(allFeeds).toBeDefined();

      // The allFeeds variable should not be empty
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('should contain objects with a URL field', function() {
      for (var i = 0, len = allFeeds.length; i < len; i++){

        // The url field in an allFeeds object should be defined
        expect(allFeeds[i].url).toBeDefined();

        // The url field in an allFeeds object should not be empty
        expect(allFeeds[i].url.length).not.toBe(0);
      }

    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('should contain objects with a name field', function() {
      for (var i = 0, len = allFeeds.length; i < len; i++){

       // The name field in an allFeeds object should be defined
        expect(allFeeds[i].name).toBeDefined();

        // The name field in an allFeeds object should not be empty
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });


  /* Test suite named "The menu" */
  describe("The menu", function() {

    var body,
        menuIcon;

    beforeEach(function() {

      // Obtain the HTML elements
      body = $('body');
      menuIcon = $('.menu-icon-link');
    });

  /* Test that ensures the menu element is
   * hidden by default. You'll have to analyze the HTML and
   * the CSS to determine how we're performing the
   * hiding/showing of the menu element.
   */
    it('should be hidden by default', function() {

      // The body element should be defined
      expect(body).toBeDefined();

      // The body element should have a class menu-hidden
      expect(body.attr('class')).toContain("menu-hidden");
    });

  /* Test that ensures the menu changes
   * visibility when the menu icon is clicked. This test
   * should have two expectations: does the menu display when
   * clicked and does it hide when clicked again.
   */
    it('should change visibility when the menu icon is clicked', function() {


      // Click the menu icon
      menuIcon.click();

      // The body element should not have the class menu-hidden
      expect(body.attr('class')).not.toContain("menu-hidden");

      // Click the menu icon again
      menuIcon.click();

      // The body element should have the class menu-hidden
      expect(body.attr('class')).toContain("menu-hidden");

    });

  });

  /* Test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    var elem;
  /* Test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test wil require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */
    beforeEach(function(done) {

      // Load the first feed
      loadFeed(0, done);
    });

    it('should contain at least one .entry element', function() {

      // Obtain the entry elements
      elem = $('.entry');

      // The entry elements should not be empty
      expect(elem.length).toBeGreaterThan(0);
    });

  });

  /* Test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {

    var title1,
        title2,
        entries1,
        entries2;

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    beforeEach(function(done) {

      // Obtain the HTML elements for the first feed
      title1 = $('.header-title').text();
      entries1 = $('.entry h2').text();

      // Select a new feed
      loadFeed(1, done);
    });

    it('should change the content', function() {

      // Obtain the HTML elements for the second feed
      title2 = $('.header-title').text();
      entries2 = $('.entry h2').text();

      // The HTML elements for the first feed and the second feed should not be the same
      expect(title1).not.toEqual(title2);
      expect(entries1).not.toEqual(entries2);
    });
  });

}());