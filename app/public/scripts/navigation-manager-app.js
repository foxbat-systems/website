(() => {

	let dropdownSpeed = 175;
	let allDropdowns = document.getElementsByClassName("dropdown");
	let allTapDropdowns = document.getElementsByClassName("tap-dropdown");
	let smallNavContainer1 = document.getElementById("small-navigation-container-1");

	/**
	* Gets the collective height of all direct children of an element
	*
	* Because the scrollHeight property of an element includes absolute-positioned
	* children's height, this function exists to get the the total height of all
	* direct children.
	*
	* @param {DOMNode} dropdown - The dropdown div
	* @return {number}
	*/
	function getTotalHeightOfAllDirectChildren(dropdown){
		let totalHeight = 0;
		let children = dropdown.children;

		for (let element of children){
			totalHeight += element.clientHeight;
		}

		return totalHeight;
	}

	/**
	* Opens a tap-dropdown
	*
	* @param {DOMNode} tapDropdownContainer - The tap-dropdown div
	* @return {void}
	*/
	function openTapDropdown(tapDropdownContainer){
		tapDropdownContainer.style.overflow = "hidden";
		tapDropdownContainer.style.display = "block";
		let childrenHeight = getTotalHeightOfAllDirectChildren(tapDropdownContainer);

		anime({
			targets:tapDropdownContainer,
			height:[0, childrenHeight],
			duration:dropdownSpeed,
			autoplay:true,
			easing:"easeInOutSine",
			complete:function(){
				tapDropdownContainer.style.overflow = "unset";
				tapDropdownContainer.style.height = "auto";
			}
		});

	}

	/**
	* Close a tap-dropdown
	*
	* @param {DOMNode} tapDropdownContainer - The tap-dropdown div
	* @return {void}
	*/
	function closeTapDropdown(tapDropdownContainer){
		tapDropdownContainer.style.overflow = "hidden";
		let currentHeight = tapDropdownContainer.clientHeight;

		// Must set the height from auto to the current computed height
		tapDropdownContainer.style.height = currentHeight + "px";

		anime({
			targets:tapDropdownContainer,
			height:[currentHeight, 0],
			duration:dropdownSpeed,
			autoplay:true,
			easing:"easeInOutSine",
			complete:function(){
				tapDropdownContainer.style.overflow = "unset";
				tapDropdownContainer.style.display = "none";
			}
		});

	}

	// Connect and handle all large-nav dropdowns
	for (let dropdown of allDropdowns){
		let dropdownContainer = dropdown.parentNode;

		dropdownContainer.onmouseleave = function(){
			dropdown.style.visibility = "hidden";
		}

		dropdownContainer.onmouseenter = function(){
			let dropdownVisibility = dropdown.style.visibility;

			if (dropdownVisibility === "hidden"){
				// The dropdown was hidden, but needs to be open
				dropdown.style.visibility = "visible";
				dropdown.style.height = "0px";
				dropdown.style.overflow = "hidden";
				anime({
					targets:dropdown,
					height:[0, getTotalHeightOfAllDirectChildren(dropdown)],
					duration:dropdownSpeed,
					autoplay:true,
					easing:"easeInOutSine",
					complete:function(){
						dropdown.style.overflow = "unset";
					}
				});
			}else{
				// The dropdown was showing, but needs to be hidden and then re-opened
				dropdown.style.visibility = "hidden";
				dropdown.style.visibility = "visible";
				dropdown.style.height = "0px";
				dropdown.style.overflow = "hidden";
				anime({
					targets:dropdown,
					height:[0, getTotalHeightOfAllDirectChildren(dropdown)],
					duration:dropdownSpeed,
					autoplay:true,
					easing:"easeInOutSine",
					complete:function(){
						dropdown.style.overflow = "unset";
					}
				});
			}
		}
	}

	// Connect and handle all small-nav tap-dropdowns
	for (let tapDropdown of allTapDropdowns){
		let dropdownContainer = tapDropdown.parentNode;
		let dropdownLinkActivator = dropdownContainer.getElementsByTagName("a")[0];

		dropdownLinkActivator.onclick = function(event){
			event.preventDefault();
			event.stopPropagation();
			let computedDisplayStyle = window.getComputedStyle(tapDropdown).getPropertyValue("display");
			if (computedDisplayStyle === "none"){
				openTapDropdown(tapDropdown);
			}else{
				closeTapDropdown(tapDropdown);
			}
		}
	}

	// Handle the opening of the small menu (#1)
	if (smallNavContainer1 !== null){
		let smallNavBackdrop = smallNavContainer1.getElementsByClassName("pullout-menu-backdrop")[0];
		let smallNavOpener = document.getElementById("small-navigation-menu-opener-1");
		let smallNavMenu = smallNavBackdrop.children[0];

		/**
		* Closes the small navigation menu 1
		*
		* @return {void}
		*/
		function closeSmallNavMenu1(){
			let originalMarginRight = parseInt(smallNavMenu.getAttribute("data-original-margin-right"), 10);
			smallNavMenu.style.marginRight = originalMarginRight + "px";
			smallNavBackdrop.classList.remove("d-flex");
			smallNavBackdrop.classList.add("d-none");
		}

		/**
		* Opens the small navigation menu 1
		*
		* @return {void}
		*/
		function openSmallNavMenu1(){
			let menuMarginRight = window.getComputedStyle(smallNavMenu).getPropertyValue("margin-right");

			smallNavBackdrop.classList.remove("d-none");
			smallNavBackdrop.classList.add("d-flex");

			smallNavMenu.setAttribute("data-original-margin-right", menuMarginRight);
			smallNavMenu.style.marginRight = "0px";

			anime({
				targets:smallNavMenu,
				marginRight:[menuMarginRight, 0],
				easing:"easeInOutSine",
				duration:100
			});
		}

		// Connect the opener (hamburger menu) click
		smallNavOpener.onclick = function(){
			openSmallNavMenu1();
		}

		// Connect to backdrop click
		smallNavBackdrop.onclick = function(e){

			// Only activate when the backdrop itself is clicked and this is not the result of bubbling
			if (e.target === smallNavBackdrop){
				closeSmallNavMenu1();
			}
		}
	}

	// Handle nav menu v2 #1
	// Added 2/12/2020
	// Garet C. Green
	( () => {
		const desktopNavLinks = document.getElementsByClassName("nav-v2-1-link");
		const desktopDropdown1NavLinks = document.getElementsByClassName("nav-v2-1-dropdown-1-link");
		const desktopDropdown2NavLinks = document.getElementsByClassName("nav-v2-1-dropdown-2-link");

		for (let link of desktopNavLinks){
			link.addEventListener("mouseenter", () => {
				if (!link.classList.contains("is-hovered")){
					link.classList.add("is-hovered");
				}
			});

			link.addEventListener("mouseleave", () => {
				if (link.classList.contains("is-hovered")){
					link.classList.remove("is-hovered");
				}
			});
		}

		for (let link of desktopDropdown1NavLinks){
			link.addEventListener("mouseenter", () => {
				if (!link.classList.contains("is-hovered")){
					link.classList.add("is-hovered");
				}
			});

			link.addEventListener("mouseleave", () => {
				if (link.classList.contains("is-hovered")){
					link.classList.remove("is-hovered");
				}
			});
		}
		
		for (let link of desktopDropdown2NavLinks){
			link.addEventListener("mouseenter", () => {
				if (!link.classList.contains("is-hovered")){
					link.classList.add("is-hovered");
				}
			});

			link.addEventListener("mouseleave", () => {
				if (link.classList.contains("is-hovered")){
					link.classList.remove("is-hovered");
				}
			});
		}
	})();
})();
