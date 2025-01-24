import validateInputs from './validation';

describe('validateInputs', () => {
  it('returns error if venueSlug is empty', () => {
    const err = validateInputs({
      venueSlug: '',
      cartValue: '10',
      userLatitude: '60.1',
      userLongitude: '24.9',
    });
    expect(err).toMatch(/Venue slug is required/);
  });

  it('returns error if cartValue is not digits', () => {
    const err = validateInputs({
      venueSlug: 'some-venue',
      cartValue: 'abc',
      userLatitude: '60.1',
      userLongitude: '24.9',
    });
    expect(err).toMatch(/must be a number/);
  });

  it('returns error if cartValue <= 0', () => {
    const err = validateInputs({
      venueSlug: 'some-venue',
      cartValue: '-10',
      userLatitude: '60.1',
      userLongitude: '24.9',
    });
    expect(err).toMatch(/must be a number/);
  });

  // ... And so on for lat/long out of range, empty, etc.

  it('returns null if all inputs are valid', () => {
    const err = validateInputs({
      venueSlug: 'valid-venue',
      cartValue: '25.5',
      userLatitude: '60.17094',
      userLongitude: '24.93087',
    });
    expect(err).toBeNull();
  });
});
