Feature: Add Dove newest product to cart

  Scenario: Login, select Dove newest item, add to cart, and verify
    Given the user is on the login page
    When the user logs in with valid credentials
    And navigates back to the home page
    And scrolls to the bottom of the page
    And clicks on the Dove brand
    And sorts products by "Date New > Old"
    And adds the newest Dove product to the cart
    Then the user should see the item in the shopping cart
