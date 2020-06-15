import { cyan } from "@material-ui/core/colors"

context ('creates store scenario', () => {
     it ('creates store', () => {
cy.visit('http://localhost:3000/')
cy.get('#root > div > div:nth-child(1) > div.DesktopWrapper > nav > span').click()
     })
})