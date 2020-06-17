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
    cy.get("input[name=email]").type("bromazing@gmail.com");
    cy.get("input[name=password]").type("datking9@");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });
  describe("dashboard", () => {
    it("contains the right nav links w/ store", () => {
      cy.contains("Your Store").should("not.be.visible");
      cy.contains("Dashboard").should("not.be.visible");
      cy.contains("Logout");
    });
    it("contains inventory section", () => {
      cy.contains("Inventory");
    });
    it("contains storefront settings w/ store & stripe status", () => {
      cy.contains("Status:");
      cy.contains("Incomplete");
      cy.contains("Connect Stripe");
      cy.contains("Create Store");
    });
    it("logs out correctly", () => {
      cy.contains("Logout").click();
      cy.url().should("eq", "http://localhost:3000/");
      cy.contains("Dev Auth")
      cy.contains("Prod Nav")
    });
  });
});
