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
  /* This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* tests that feeds url are defined and are not empty */
    it('should have an URL', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeTruthy();
        expect(feed.url.length).toBeGreaterThan(0);
      });
    });

    /* tests that feeds name are defined and are not empty */
    it('should have a name', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeTruthy();
        expect(feed.name.length).toBeGreaterThan(0);
      });
    });
  });


  /* test suite named "The menu" */
  describe('The menu', function() {

    /* test menu bar is hidden by default */
    it('should be hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
      /*console.log($('body').hasClass());*/
    });

    /* tests visibility of the menu changes when
       the menu-icon is clicked by user.
    */
    it('should change visibility when clicked', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {

      /* test at least single entry is present under
          each feed container.
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('has at least single element', function() {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    /* test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
      var feedText;
      /* tests that contents changes when loaded. */
      beforeEach(function(done) {
        loadFeed(0, function() {
          feedText = $('.feed').text();
          loadFeed(1, function() {
            done();
          });
        });
      });

      it('loaded by the loadFeed', function() {
        expect($('.feed').text()).not.toBe(feedText);
      });
    });
  });
}());