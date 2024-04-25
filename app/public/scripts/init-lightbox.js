/**
 * This script initializes a lightbox gallery for any anchor with data-lightbox as an attribute.
 * @Author Garet C. Green
 */
(() => {
	if (SimpleLightbox === undefined) {
		console.warn("Tried to initialize page lightbox feature but SimpleLightbox is not yet loaded. Did you forget to include the lightbox source code?");
	} else {
		// Fetch all anchor elements that have data-lightbox on them
		const lightboxAnchors = document.querySelectorAll(`a[data-lightbox]`);

		// Gather all anchors categorized by their gallery name from the data-lightbox attribute
		/** @type {{[string]:{HTMLElement}}} */
		const initializedGalleriesByName = {};
		for (/** @type {HTMLAnchorElement} */ const anchor of lightboxAnchors){
			const galleryName = anchor.getAttribute("data-lightbox");
			if (!(galleryName in initializedGalleriesByName)){
				initializedGalleriesByName[galleryName] = [];
			}

			initializedGalleriesByName[galleryName].push(anchor);
		}

		// Load SimpleLightbox for each gallery collection
		for (const galleryName in initializedGalleriesByName){
			new SimpleLightbox(initializedGalleriesByName[galleryName], {uniqueImages:false});
		}
	}
})();