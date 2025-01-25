import type { DeliveryFormData } from '../support/index.d.ts'

describe('DeliveryPriceForm E2E', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	Cypress.Commands.add('fillDeliveryForm', (mockData: Partial<DeliveryFormData> = {}) => {
		const defaultData: DeliveryFormData = {
			venueSlug: 'home-assignment-venue-helsinki',
			cartValue: '25.5',
			userLatitude: '60.17094',
			userLongitude: '24.92814'
		};
	
		const data: DeliveryFormData = { ...defaultData, ...mockData };
	
		cy.get('[data-test-id="venueSlug"]').clear().type(data.venueSlug);
		cy.get('[data-test-id="cartValue"]').clear().type(data.cartValue);
		cy.get('[data-test-id="userLatitude"]').clear().type(data.userLatitude);
		cy.get('[data-test-id="userLongitude"]').clear().type(data.userLongitude);
		cy.get('[data-test-id="calculateDeliveryPrice"]').click();
	});
	it('fills the form and gets a price breakdown', () => {
		cy.fillDeliveryForm();
		cy.get('.price-breakdown').should('be.visible');
		cy.get('.price-breakdown [data-raw-value]').should('have.length', 5);
		cy.get('[data-raw-value="2550"]').should('exist');
	});
	it('shows an error if user enters invalid cart value(negative/non digit)', () => {
		cy.fillDeliveryForm({cartValue: "-50"});
		cy.contains('Cart value must be a number').should('be.visible');
		cy.get('[data-test-id="cartValue"]').clear().type('50e');
		cy.get('[data-test-id="calculateDeliveryPrice"]').click();
		cy.contains('Cart value must be a number').should('be.visible');
	});
	it('shows an error on out of range delivery, shows data if in range', () => {
		cy.fillDeliveryForm({userLatitude: "60.18858"});
		cy.contains('Delivery not possible! Too far:').should('be.visible');
		cy.get('[data-test-id="userLatitude"]').clear().type('60.18628'); // approx. 1900m
		cy.get('[data-test-id="calculateDeliveryPrice"]').click();
		cy.get('.price-breakdown').should('be.visible');
		cy.get('.price-breakdown [data-raw-value]').should('have.length', 5);
	})
	it('doesnt accept wrong latitude/longitude', () => {
		cy.fillDeliveryForm({userLatitude: "90.18858"});
		cy.contains('Latitude must be a valid number between -90 and 90').should('be.visible');
		cy.get('[data-test-id="userLatitude"]').clear().type('60.18858');
		cy.get('[data-test-id="userLongitude"]').clear().type('-194.92814');
		cy.get('[data-test-id="calculateDeliveryPrice"]').click();
		cy.contains('Longitude must be a valid number between -180 and 180').should('be.visible');
	})
});

describe('Geolocation tests', () => {
	beforeEach(() => {
	  cy.visit('/')
	})

	Cypress.Commands.add('mockGeolocation', (latitude: number, longitude: number) => {
		cy.window().then((window) => {
			cy.stub(window.navigator.geolocation, 'getCurrentPosition')
			.callsFake((cb) => {
				return cb({
				coords: {
					latitude,
					longitude,
					accuracy: 1,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					speed: null
				},
				timestamp: Date.now()
				})
			})
		})
		})

	
	it('should show an error if geolocation is not supported', () => {
		cy.visit('/', {
			onBeforeLoad(win) {
			  Object.defineProperty(win.navigator, 'geolocation', {
				value: undefined,
				configurable: true
			  })
			}
		  })
		cy.get('[data-test-id="getLocation"]').click()
		cy.contains('Geolocation is not supported by this browser')
		}
	)
  
	it('should update coordinates when Get location is clicked', () => {
	  cy.mockGeolocation(60.17094, 24.92814)
	  cy.get('[data-test-id="getLocation"]').click()
	  cy.get('[data-test-id="userLatitude"]').should('have.value', '60.17094')
	  cy.get('[data-test-id="userLongitude"]').should('have.value', '24.92814')
	})
  })