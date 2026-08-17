/**
 * Keeps every add-to-cart control on a product page (the main buy box and
 * both sticky bars) in sync with Dawn's stock variant-selects. Listens for
 * the same PUB_SUB_EVENTS.optionValueSelectionChange event that ships with
 * the theme (assets/global.js), matches the selected option values against
 * the product's real variants, and updates every hidden variant-id input,
 * price display, and add-to-cart button on the page. A product page has
 * exactly one product, so updating every matching element document-wide is
 * safe and keeps the main buy box and the sticky bars from drifting apart.
 * Also handles the product gallery's thumbnail-click behavior.
 */
(function () {
  function findVariant(variants, selectedOptionValues) {
    return variants.find((variant) =>
      variant.options.every((value, index) => value === selectedOptionValues[index])
    );
  }

  function applyVariant(variants, variant) {
    document.querySelectorAll('.product-variant-id').forEach(function (idInput) {
      if (variant) {
        idInput.value = variant.id;
        idInput.disabled = false;
      } else {
        idInput.value = '';
        idInput.disabled = true;
      }
    });

    document.querySelectorAll('[data-fz-price]').forEach(function (priceEl) {
      if (variant) priceEl.textContent = variant.price;
    });

    document.querySelectorAll('[data-fz-compare-price]').forEach(function (compareEl) {
      if (!variant) return;
      if (variant.on_sale) {
        compareEl.textContent = variant.compare_at_price;
        compareEl.hidden = false;
      } else {
        compareEl.hidden = true;
      }
    });

    document.querySelectorAll('.product-form__submit').forEach(function (submitBtn) {
      var submitText = submitBtn.querySelector('span');
      if (variant && variant.available) {
        submitBtn.removeAttribute('disabled');
        submitBtn.removeAttribute('aria-disabled');
        if (submitText) submitText.textContent = (window.variantStrings && window.variantStrings.addToCart) || 'Add to cart';
      } else if (variant) {
        submitBtn.setAttribute('disabled', 'disabled');
        if (submitText) submitText.textContent = (window.variantStrings && window.variantStrings.soldOut) || 'Sold out';
      } else {
        submitBtn.setAttribute('disabled', 'disabled');
        if (submitText) submitText.textContent = (window.variantStrings && window.variantStrings.unavailable) || 'Unavailable';
      }
    });

    document.querySelectorAll('[data-fz-buy-now]').forEach(function (buyNowBtn) {
      if (variant && variant.available) {
        buyNowBtn.removeAttribute('disabled');
      } else {
        buyNowBtn.setAttribute('disabled', 'disabled');
      }
    });
  }

  function initBuyNow() {
    document.querySelectorAll('[data-fz-buy-now]').forEach(function (buyNowBtn) {
      buyNowBtn.addEventListener('click', function () {
        if (buyNowBtn.hasAttribute('disabled')) return;
        var buybox = buyNowBtn.closest('[data-fz-buybox]');
        var idInput = buybox ? buybox.querySelector('.product-variant-id') : document.querySelector('.product-variant-id');
        if (!idInput || !idInput.value) return;

        var originalText = buyNowBtn.textContent;
        buyNowBtn.setAttribute('disabled', 'disabled');
        buyNowBtn.textContent = 'Adding…';

        fetch((window.routes && window.routes.cart_add_url) || '/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items: [{ id: idInput.value, quantity: 1 }] }),
        })
          .then(function (response) {
            return response.json().then(function (data) {
              if (!response.ok) throw new Error(data.description || data.message || 'Could not add to cart');
              window.location.href = '/checkout';
            });
          })
          .catch(function () {
            buyNowBtn.removeAttribute('disabled');
            buyNowBtn.textContent = originalText;
          });
      });
    });
  }

  function initVariantSync() {
    var dataEl = document.querySelector('[data-fz-variants]');
    if (!dataEl) return;

    var variants;
    try {
      variants = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }

    if (typeof subscribe !== 'function' || typeof PUB_SUB_EVENTS === 'undefined') return;

    subscribe(PUB_SUB_EVENTS.optionValueSelectionChange, function (event) {
      var variant = findVariant(variants, event.data.selectedOptionValues);
      applyVariant(variants, variant);
    });
  }

  function initGallery(gallery) {
    var main = gallery.querySelector('.fz-pdp__main-media img');
    gallery.querySelectorAll('.fz-pdp__thumb[data-full]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        gallery.querySelectorAll('.fz-pdp__thumb--active').forEach(function (t) {
          t.classList.remove('fz-pdp__thumb--active');
        });
        thumb.classList.add('fz-pdp__thumb--active');
        if (main) {
          main.src = thumb.dataset.full;
          main.removeAttribute('srcset');
        }
      });
    });
  }

  function init() {
    initVariantSync();
    initBuyNow();
    document.querySelectorAll('.fz-pdp__gallery').forEach(initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
