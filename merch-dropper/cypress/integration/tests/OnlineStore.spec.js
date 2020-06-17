describe("My First Test", function () {
  it("sanity check", function () {
    expect(true).to.equal(true);
  });
});

describe("Landing page", () => {
  it("contains a Dev Auth button", () => {
    cy.visit("/");
    cy.contains("Dev Auth");
  });
  it("contains a Prod Nav button", () => {
    cy.contains("Prod Nav");
  });
  it("contains an FAQ", () => {
    cy.contains("Frequently Asked Questions");
  });
});

describe("Dev Auth path", () => {
  it("redirects to register page", () => {
    cy.contains("Dev Auth").click();
    cy.url().should("include", "/develop");
  });
  it("goes to dashboard", () => {
    cy.contains("Toggle Login/Register").click();
    cy.get("input[name=email]").type("bah@gmail.com");
    cy.get("input[name=password]").type("datking9@");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });
  describe("dashboard", () => {
    it("contains the right nav links w/ store", () => {
        cy.contains('Your Store')    
        cy.contains("Dashboard").should('not.be.visible')
        cy.contains("Logout")
    })
      it("contains inventory section", () => {
          cy.contains("Inventory")
      })
      it("contains storefront settings w/ store & stripe status", () => {
          cy.contains("Status:")
          cy.contains("Online")
          cy.contains("connect stripe").should("not.be.visible")
          cy.contains("create store").should("not.be.visible")
      })
  })
});
