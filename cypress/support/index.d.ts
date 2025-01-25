/// <reference types="cypress" />

export interface DeliveryFormData {
  venueSlug: string
  cartValue: string
  userLatitude: string
  userLongitude: string
}

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      fillDeliveryForm(mockData?: Partial<DeliveryFormData>): Chainable<void>
      mockGeolocation(latitude: number, longitude: number): Chainable<void>
    }
  }
}