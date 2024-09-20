/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import produtosPage from '../support/page_objects/produtos.page';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br/')
  });

  it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    //fazendo um cadastro
    cy.get('.icon-user-unfollow').click()
    cy.get('#reg_email').type(faker.internet.email())
    cy.get('#reg_password').type('teste@123')
    cy.get(':nth-child(4) > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

    //buscando produtos e adicionando ao carrinho
    let qtd = 1
    produtosPage.buscarProduto('Aero Daily Fitness Tee')
    cy.get('.product_title').should('contain' , 'Aero Daily Fitness Tee')
    produtosPage.addProdutoCarrinho('S', 'Black', qtd)
    
    produtosPage.buscarProduto('Abominable Hoodie')
    cy.get('.product_title').should('contain' , 'Abominable Hoodie')
    produtosPage.addProdutoCarrinho('M', 'Red', qtd)     
    
    produtosPage.buscarProduto('Aether Gym Pant')
    cy.get('.product_title').should('contain' , 'Aether Gym Pant')
    produtosPage.addProdutoCarrinho('32', 'Green', qtd)
    
    produtosPage.buscarProduto('Apollo Running Short')
    cy.get('.product_title').should('contain' , 'Apollo Running Short')
    produtosPage.addProdutoCarrinho('36', 'Black', qtd)

    //visualizando carrinho e produtos adicionados
    cy.get('.woocommerce-message > .button').click()
    cy.get(':nth-child(1) > .product-name > a').should('contain', 'Aero Daily Fitness Tee - S, Black')
    cy.get(':nth-child(2) > .product-name > a').should('contain', 'Abominable Hoodie - M, Red')
    cy.get(':nth-child(3) > .product-name > a').should('contain', 'Aether Gym Pant - 32, Green')
    cy.get(':nth-child(4) > .product-name > a').should('contain', 'Apollo Running Short - 36, Black')
    cy.get('.checkout-button').click()

    //Preenchendo Checkout
    cy.get('#billing_first_name').type('Samuel')
    cy.get('#billing_last_name').type('Plauto')
    cy.get('#billing_address_1').type('Rua Minas Gerais 1743')
    cy.get('#billing_city').type('Fortaleza')
    cy.get('#billing_phone').type('85996108284')
    cy.get('#billing_postcode').type('60440205')
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()

    //finalizando compra
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.')

    //Fazendo logout 
    cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a').click()
    cy.get('#primary-menu > .menu-item-536 > .dropdown-toggle').should('exist')

    //Fim do script de teste*/

    })

})