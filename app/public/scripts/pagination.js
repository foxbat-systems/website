window.addEventListener('DOMContentLoaded', () => {

	/**
	 * @param {HTMLDivElement} parent
	 */
	function paginate(parent) {

		if (parent === null || parent === undefined){
			console.warn("Cannot initialize a paginator for a null element.");
			return;
		}

		// Get the attributes from the pagination parent
		let maxItemsPerPage = parseInt(parent.getAttribute("elements-per-page"), 10)
		let pageContainerClasses = parent.getAttribute("page-container-classes"); // classes that will go on each div[page-container]
		let paginationControlsLocation = parent.getAttribute("paginator-controls-location"); // determine location(s) of paginator controls
		let paginationControlsClasses = parent.getAttribute("paginator-controls-classes"); // classes that will go on the pagination controls container
		let paginationControlsButtonClasses = parent.getAttribute("paginator-controls-button-classes"); // classes that will go on the pagination controls buttons
		let paginationControlsInputClasses = parent.getAttribute("paginator-controls-input-classes"); // classes that will go on the pagination controls input
		let paginationControlsDivClasses = parent.getAttribute("paginator-controls-div-classes"); // classes that will go on the pagination controls inner div
		let paginationControlsSpanClasses = parent.getAttribute("paginator-controls-span-classes"); // classes that will go on the pagination controls total-pages span

		let items = parent.children; // all the items to paginate
		let totalItems = parent.children.length;
		let neededPages = Math.ceil(totalItems / maxItemsPerPage); // get the number of pages required, rounded up
		
		// Exit if there are no items to paginate.
		if (totalItems < 1) {
			console.warn("No items to paginate.");
			return;
		}

		// push the items into a placeholder array
		const pageItems = [];
		for (const item of items) {
			pageItems.push(item);
		}

		// create the page containers and append the items
		for (let i = 0; i < neededPages; i++) {
			let pageContainer = document.createElement("div");
			let pageNum = i + 1;
			pageContainer.setAttribute("page-container", "");
			pageContainer.setAttribute("page-number", pageNum.toString());
			if (pageContainerClasses == null) {
				pageContainerClasses = "";
			}
			pageContainer.setAttribute("class", pageContainerClasses); // using setAttribute instead of classList.add so that we can have a string with spaces instead of comma separation.
			if (i > 0) {
				pageContainer.style.display = "none"; // hide all but the first page
			}

			const offset = i * maxItemsPerPage;
			for (let j = 0; j < maxItemsPerPage; j++) {
				const index = offset + j;
				const item = pageItems[index];

				if (item == undefined) {
					break;
				}
				pageContainer.append(item);
			}
			parent.append(pageContainer);
		}

		// create the page controls
		let paginationControlsContainer = document.createElement("div");
		paginationControlsContainer.setAttribute("pagination-controls-container","");

		let prevButton = document.createElement("button");
		prevButton.setAttribute("type","button");
		prevButton.setAttribute("prev","");
		prevButton.innerText = "Prev";

		let nextButton = document.createElement("button");
		nextButton.setAttribute("type","button");
		nextButton.setAttribute("next","");
		nextButton.innerText = "Next";

		// Div parent containing input and span children
		let pageInputDiv = document.createElement("div");
		let pageInput = document.createElement("input");
		let pageInputSpan = document.createElement("span");
		pageInputSpan.innerText = "/ " + neededPages;
		pageInput.value = "1";
		pageInputDiv.append(pageInput);
		pageInputDiv.append(pageInputSpan);

		paginationControlsContainer.append(prevButton);
		paginationControlsContainer.append(pageInputDiv);
		paginationControlsContainer.append(nextButton);

		let paginationControlsContainerTop = paginationControlsContainer.cloneNode(true);
		let paginationControlsContainerBottom = paginationControlsContainer.cloneNode(true);

		// attach pagination controls to pagination root element.
		parent.prepend(paginationControlsContainerTop);
		parent.append(paginationControlsContainerBottom);

		let inputTop = paginationControlsContainerTop.querySelector("input");
		let inputBottom = paginationControlsContainerBottom.querySelector("input");

		let nextTop = paginationControlsContainerTop.querySelector("button[next]");
		let nextBottom = paginationControlsContainerBottom.querySelector("button[next]");

		let prevTop = paginationControlsContainerTop.querySelector("button[prev]");
		let prevBottom = paginationControlsContainerBottom.querySelector("button[prev]");

		inputTop.addEventListener('keydown', (e)=>{
			if (e.code === "Enter" || e.code === "NumpadEnter") {
				let wantedPage = parseInt(inputTop.value);
				updatePageContainers(wantedPage, neededPages);
			}
		});

		inputBottom.addEventListener('keydown', (e)=>{
			if (e.code === "Enter" || e.code === "NumpadEnter") {
				let wantedPage = parseInt(inputBottom.value);
				updatePageContainers(wantedPage, neededPages);
			}
		});

		nextTop.addEventListener('click', ()=>{
			let currentPage = parseInt(inputTop.value);
			updatePageContainers(currentPage+1, neededPages);
		});

		prevTop.addEventListener('click', ()=>{
			let currentPage = parseInt(inputTop.value);
			updatePageContainers(currentPage-1, neededPages);
		});

		nextBottom.addEventListener('click', ()=>{
			let currentPage = parseInt(inputBottom.value);
			updatePageContainers(currentPage+1, neededPages);
		});

		prevBottom.addEventListener('click', ()=>{
			let currentPage = parseInt(inputBottom.value);
			updatePageContainers(currentPage-1, neededPages);
		});

		// Handle logic for displaying paginator at top, bottom or both
		if (paginationControlsLocation === "top") {
			paginationControlsContainerBottom.style.display = "none";
		}
		else if (paginationControlsLocation === "bottom") {
			paginationControlsContainerTop.style.display = "none";
		}

		// Handle styling for pagination controls
		paginationControlsContainerTop.setAttribute("class",paginationControlsClasses);
		paginationControlsContainerBottom.setAttribute("class",paginationControlsClasses);

		nextTop.setAttribute("class",paginationControlsButtonClasses);
		prevTop.setAttribute("class",paginationControlsButtonClasses);
		nextBottom.setAttribute("class",paginationControlsButtonClasses);
		prevBottom.setAttribute("class",paginationControlsButtonClasses);

		inputTop.setAttribute("class",paginationControlsInputClasses);
		inputBottom.setAttribute("class",paginationControlsInputClasses);

		inputTop.style.maxWidth = "45px";
		inputBottom.style.maxWidth = "45px";

		paginationControlsContainerTop.querySelector("div").setAttribute("class",paginationControlsDivClasses);
		paginationControlsContainerBottom.querySelector("div").setAttribute("class",paginationControlsDivClasses);

		paginationControlsContainerBottom.querySelector("span").setAttribute("class",paginationControlsSpanClasses);
		paginationControlsContainerTop.querySelector("span").setAttribute("class",paginationControlsSpanClasses);

	}

	function updatePageContainers(wantedPageNum, maxPageNum) {
		let pageContainers = document.querySelectorAll("div[page-container]");
		let paginationControlsContainers = document.querySelectorAll("div[pagination-controls-container]");
		let paginationControlsContainerTop = paginationControlsContainers[0];
		let paginationControlsContainerBottom = paginationControlsContainers[1];
		let inputTop = paginationControlsContainerTop.querySelector("input");
		let inputBottom = paginationControlsContainerBottom.querySelector("input");

		// Validate input values
		if (wantedPageNum < 1) {
			wantedPageNum = 1;
		}
		if (wantedPageNum > maxPageNum) {
			wantedPageNum = maxPageNum;
		}
		if (isNaN(wantedPageNum)){
			wantedPageNum = 1;
		}

		// Make sure both top and bottom inputs have the same value
		inputTop.value = wantedPageNum;
		inputBottom.value = wantedPageNum;

		// Update container visibility
		for (const pageContainer of pageContainers) {
			if (parseInt(pageContainer.getAttribute("page-number")) === parseInt(wantedPageNum)) {
				pageContainer.style.display = "flex";
			} else {
				pageContainer.style.display = "none";
			}
		}
	}

	// run the damn function
	let parentEl = document.querySelector("div[paginate]");
	paginate(parentEl);
});
