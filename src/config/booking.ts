/**
 * Kings Head Hotel (Rezcontrol) booking. Base URL primes the SPA (Apollo/i18next) in a hidden iframe
 * so that when the guest clicks "Book Now" with the full URL, the engine has already run and params apply.
 */
export const KINGS_HEAD_BOOKING_BASE_URL = 'https://kingshead-hotel-brakspear.rezcontrol.com/';

const PROMO_CODE = encodeURIComponent('Feleena and Christopher').replace(/%20/g, '+');
export const KINGS_HEAD_BOOKING_URL =
  `https://kingshead-hotel-brakspear.rezcontrol.com/rooms?startDate=2026-07-31&endDate=2026-08-02&promoCode=${PROMO_CODE}&selectedBooking=1&booking=%5B%7B%22bookingId%22%3A1%2C%22guests%22%3A%7B%22adults%22%3A2%2C%22children%22%3A0%2C%22infants%22%3A0%2C%22pets%22%3A0%7D%7D%5D`;
