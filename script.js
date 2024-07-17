document.addEventListener("DOMContentLoaded", () => {
  let currStepNumber = 1;
  const goBackBtn = document.querySelectorAll(".go-back-btn");
  const changePlanBtn = document.querySelector(".change-plan");

  // Step 1
  const step1Btn = document.querySelector(".step-1-btn");
  const phoneNumber = document.querySelector("#phone");
  let loginSuccessful = false;
  document.addEventListener("DOMContentLoaded", () => {
    let currStepNumber = 1;
    const goBackBtn = document.querySelectorAll(".go-back-btn");
    const changePlanBtn = document.querySelector(".change-plan");

    // Step 1
    const step1Btn = document.querySelector(".step-1-btn");
    const phoneNumber = document.querySelector("#phone");
    let loginSuccessful = false;

    // Step 2
    const step2options = document.querySelectorAll(".step-2-option");
    const toggleArea = document.querySelector(".toggle-area");
    const monthlyToggle = document.querySelector(".toggle-monthly");
    const yearlyToggle = document.querySelector(".toggle-yearly");
    const arcadePrice = document.querySelector(".arcade-price");
    const advancedPrice = document.querySelector(".advanced-price");
    const proPrice = document.querySelector(".pro-price");
    const features = document.querySelectorAll(".feature");
    const step2Btn = document.querySelector(".step-2-btn");
    let toggleCount = 0;
    let planType = "Monthly";
    let planPrice = 9;
    let planName = "Arcade";

    // Step 3
    const step3options = document.querySelectorAll(".step-3-option");
    const selectOption = document.querySelectorAll(".click-option");
    const step3Btn = document.querySelector(".step-3-btn");

    // Step 4
    const finalAddonSection = document.querySelector(
      ".selected-add-on-section"
    );
    const billPlanName = document.querySelector(".final-plan-text");
    const billPlanPrice = document.querySelector(".selected-plan-price");
    const divider = document.querySelector(".divider");
    const totalText = document.querySelector(".total-text");
    const totalPrice = document.querySelector(".total-price");
    const step4Btn = document.querySelector(".step-4-btn");
    let finalPrice = 0;

    step2options.forEach((option) => {
      option.addEventListener("click", () => {
        step2options.forEach((stepOption) => {
          stepOption.classList.remove("option-clicked");
        });
        option.classList.add("option-clicked");
        setPlanDetails();
      });
    });

    toggleArea.addEventListener("click", () => {
      toggleCount++;
      // Yearly
      if (toggleCount % 2 != 0) {
        toggleArea.style.justifyContent = "flex-end";
        monthlyToggle.classList.remove("bold");
        yearlyToggle.classList.add("bold");
        arcadePrice.innerHTML = '$<span class="price-amt">90</span>/yr';
        advancedPrice.innerHTML = '$<span class="price-amt">120</span>/yr';
        proPrice.innerHTML = '$<span class="price-amt">150</span>/yr';
        features.forEach((feature) => {
          feature.style.display = "flex";
        });
        planType = "Yearly";
        setPlanDetails();
      }
      // Monthly
      else {
        toggleArea.style.justifyContent = "flex-start";
        monthlyToggle.classList.add("bold");
        yearlyToggle.classList.remove("bold");
        arcadePrice.innerHTML = '$<span class="price-amt">9</span>/mo';
        advancedPrice.innerHTML = '$<span class="price-amt">12</span>/mo';
        proPrice.innerHTML = '$<span class="price-amt">15</span>/mo';
        features.forEach((feature) => {
          feature.style.display = "none";
        });
        planType = "Monthly";
        setPlanDetails();
      }
    });

    goBackBtn.forEach((button) => {
      button.addEventListener("click", () => {
        currStepNumber = goToPreviousStep(currStepNumber);
      });
    });

    changePlanBtn.addEventListener("click", () => {
      const currStep = document.querySelector(`.step-${currStepNumber}`);
      currStep.style.display = "none";

      currStepNumber = 2;
      const nextStep = document.querySelector(`.step-${currStepNumber}`);
      nextStep.style.display = "flex";
    });

    step1Btn.addEventListener("click", (event) => {
      event.preventDefault();
      loginSuccessful = validateLoginCredentials();
      if (loginSuccessful) {
        currStepNumber = goToNextStep(currStepNumber);
      }
    });

    step2Btn.addEventListener("click", () => {
      currStepNumber = goToNextStep(currStepNumber);
    });

    step3Btn.addEventListener("click", () => {
      currStepNumber = goToNextStep(currStepNumber);
      setBill();
    });

    step4Btn.addEventListener("click", () => {
      currStepNumber = goToNextStep(currStepNumber);
    });

    step3options.forEach((option) => {
      option.addEventListener("click", () => {
        option.classList.toggle("step-3-active");
        setTickIcon(option);
      });
    });

    function validateLoginCredentials() {
      let isNameValid = validateName();
      let isEmailValid = validateEmail();
      let isNumberValid = validateNumber();
      return isNameValid && isEmailValid && isNumberValid;
    }

    function checkIsEmpty(input, errorMsg) {
      if (!input.value) {
        errorMsg.textContent = "This field is required";
        errorMsg.style.display = "flex";
        input.style.borderColor = "var(--strawberry-red)";
        return true;
      } else {
        errorMsg.style.display = "none";
        input.style.borderColor = "var(--cool-gray)";
        return false;
      }
    }

    function validateName() {
      const nameInput = document.querySelector("#name");
      const errorMsg = document.querySelector(".error-msg-name");
      return !checkIsEmpty(nameInput, errorMsg);
    }

    function validateEmail() {
      const emailInput = document.querySelector("#email");
      const errorMsg = document.querySelector(".error-msg-email");
      let isEmpty = checkIsEmpty(emailInput, errorMsg);

      if (!isEmpty) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = regex.test(emailInput.value);
        if (!isValid) {
          errorMsg.style.display = "flex";
          errorMsg.textContent = "Enter a valid email";
          emailInput.style.borderColor = "var(--strawberry-red)";
        }
        return isValid;
      }
      return isEmpty;
    }

    function validateNumber() {
      const phoneInput = document.querySelector("#phone");
      const errorMsg = document.querySelector(".error-msg-number");
      let isEmpty = checkIsEmpty(phoneInput, errorMsg);

      if (!isEmpty) {
        let isValid = isNumeric(phoneInput.value);
        let isLengthValid = true;
        if (phoneInput.value.length != 10) {
          errorMsg.style.display = "flex";
          errorMsg.textContent = "10-digit numbers only";
          phoneInput.style.borderColor = "var(--strawberry-red)";
          isValid = false;
          isLengthValid = false;
        }
        if (!isValid && isLengthValid) {
          errorMsg.style.display = "flex";
          errorMsg.textContent = "Enter a valid number";
          phoneInput.style.borderColor = "var(--strawberry-red)";
        }
        return isValid;
      }
      return isEmpty;
    }

    function isNumeric(input) {
      const regex = /^[0-9]+$/;
      return regex.test(input);
    }

    function setTickIcon(element) {
      const clickBox = element.querySelector(".click-option");
      if (clickBox.innerHTML === "") {
        clickBox.innerHTML =
          '<img src="./assets/images/icon-checkmark.svg" alt="">';
        clickBox.style.borderColor = "var(--purplish-blue)";
        clickBox.style.backgroundColor = "var(--purplish-blue)";
      } else {
        clickBox.innerHTML = "";
        clickBox.style.borderColor = "var(--light-gray)";
        clickBox.style.backgroundColor = "var(--white)";
      }
    }

    function goToNextStep(currStepNumber) {
      const currStep = document.querySelector(`.step-${currStepNumber}`);
      currStep.style.display = "none";

      currStepNumber++;
      const nextStep = document.querySelector(`.step-${currStepNumber}`);
      nextStep.style.display = "flex";
      return currStepNumber;
    }

    function goToPreviousStep(currStepNumber) {
      if (currStepNumber != 1) {
        const currStep = document.querySelector(`.step-${currStepNumber}`);
        currStep.style.display = "none";
        currStepNumber--;
        const prevStep = document.querySelector(`.step-${currStepNumber}`);
        prevStep.style.display = "flex";
      }
      return currStepNumber;
    }

    function setPlanDetails() {
      step2options.forEach((option) => {
        if (option.classList.contains("option-clicked")) {
          const Price = option.querySelector(".price-amt");
          planPrice = parseInt(Price.textContent);
          planName = option.querySelector(".planName").textContent;
        }
      });
    }

    function selectedAddons(addon) {
      if (addon.classList.contains("step-3-active")) {
        divider.style.display = "block";
        let selectedAddon = addon.querySelector(".add-on").textContent;
        let addonPrice = addon.querySelector(".add-on-price").textContent;
        if (planType === "Monthly") {
          addonPrice = `+${addonPrice}$/mo`;
        } else {
          addonPrice = `+${addonPrice * 10}$/yr`;
        }
        return { service: selectedAddon, serviceCost: addonPrice };
      }
      return { service: "", serviceCost: "" };
    }

    function setBill() {
      resetBill();
      finalPrice += planPrice;
      billPlanName.textContent = `${planName} (${planType})`;
      if (planType === "Monthly") {
        billPlanPrice.textContent = `$${planPrice}/mo`;
        totalText.textContent = "Total (per month)";
      } else {
        billPlanPrice.textContent = `$${planPrice}/yr`;
        totalText.textContent = "Total (per year)";
      }

      // Display Selected Addons
      step3options.forEach((addon) => {
        let { service, serviceCost } = selectedAddons(addon);
        if (service != "" && serviceCost != "") {
          setBillAddon(service, serviceCost);
          let addOnCost = parseInt(serviceCost.match(/\d+/)[0]);
          finalPrice += addOnCost;
        }
      });

      // Display Final Cost
      if (planType === "Monthly") {
        totalPrice.textContent = `$${finalPrice}/mo`;
      } else {
        totalPrice.textContent = `$${finalPrice}/yr`;
      }
    }

    function setBillAddon(service, price) {
      let addOn = document.createElement("div");
      addOn.classList.add("selected-add-on");
      finalAddonSection.appendChild(addOn);

      let text = document.createElement("p");
      text.classList.add("final-addon-text");
      text.textContent = service;
      addOn.appendChild(text);

      let serviceCost = document.createElement("p");
      serviceCost.classList.add("selected-addon-price");
      serviceCost.textContent = price;
      addOn.appendChild(serviceCost);
    }

    function resetBill() {
      finalPrice = 0;
      const addOnsSelected = document.querySelectorAll(".selected-add-on");
      addOnsSelected.forEach((addOn) => {
        addOn.style.display = "none";
        addOn.remove();
      });
    }
  });

  // Step 2
  const step2options = document.querySelectorAll(".step-2-option");
  const toggleArea = document.querySelector(".toggle-area");
  const monthlyToggle = document.querySelector(".toggle-monthly");
  const yearlyToggle = document.querySelector(".toggle-yearly");
  const arcadePrice = document.querySelector(".arcade-price");
  const advancedPrice = document.querySelector(".advanced-price");
  const proPrice = document.querySelector(".pro-price");
  const features = document.querySelectorAll(".feature");
  const step2Btn = document.querySelector(".step-2-btn");
  let toggleCount = 0;
  let planType = "Monthly";
  let planPrice = 9;
  let planName = "Arcade";

  // Step 3
  const step3options = document.querySelectorAll(".step-3-option");
  const selectOption = document.querySelectorAll(".click-option");
  const step3Btn = document.querySelector(".step-3-btn");

  // Step 4
  const finalAddonSection = document.querySelector(".selected-add-on-section");
  const billPlanName = document.querySelector(".final-plan-text");
  const billPlanPrice = document.querySelector(".selected-plan-price");
  const divider = document.querySelector(".divider");
  const totalText = document.querySelector(".total-text");
  const totalPrice = document.querySelector(".total-price");
  const step4Btn = document.querySelector(".step-4-btn");
  let finalPrice = 0;

  step2options.forEach((option) => {
    option.addEventListener("click", () => {
      step2options.forEach((stepOption) => {
        stepOption.classList.remove("option-clicked");
      });
      option.classList.add("option-clicked");
      setPlanDetails();
    });
  });

  toggleArea.addEventListener("click", () => {
    toggleCount++;
    // Yearly
    if (toggleCount % 2 != 0) {
      toggleArea.style.justifyContent = "flex-end";
      monthlyToggle.classList.remove("bold");
      yearlyToggle.classList.add("bold");
      arcadePrice.innerHTML = '$<span class="price-amt">90</span>/yr';
      advancedPrice.innerHTML = '$<span class="price-amt">120</span>/yr';
      proPrice.innerHTML = '$<span class="price-amt">150</span>/yr';
      features.forEach((feature) => {
        feature.style.display = "flex";
      });
      planType = "Yearly";
      setPlanDetails();
    }
    // Monthly
    else {
      toggleArea.style.justifyContent = "flex-start";
      monthlyToggle.classList.add("bold");
      yearlyToggle.classList.remove("bold");
      arcadePrice.innerHTML = '$<span class="price-amt">9</span>/mo';
      advancedPrice.innerHTML = '$<span class="price-amt">12</span>/mo';
      proPrice.innerHTML = '$<span class="price-amt">15</span>/mo';
      features.forEach((feature) => {
        feature.style.display = "none";
      });
      planType = "Monthly";
      setPlanDetails();
    }
  });

  goBackBtn.forEach((button) => {
    button.addEventListener("click", () => {
      currStepNumber = goToPreviousStep(currStepNumber);
    });
  });

  changePlanBtn.addEventListener("click", () => {
    const currStep = document.querySelector(`.step-${currStepNumber}`);
    currStep.style.display = "none";

    currStepNumber = 2;
    const nextStep = document.querySelector(`.step-${currStepNumber}`);
    nextStep.style.display = "flex";
  });

  step1Btn.addEventListener("click", (event) => {
    event.preventDefault();
    loginSuccessful = validateLoginCredentials();
    if (loginSuccessful) {
      currStepNumber = goToNextStep(currStepNumber);
    }
  });

  step2Btn.addEventListener("click", () => {
    currStepNumber = goToNextStep(currStepNumber);
  });

  step3Btn.addEventListener("click", () => {
    currStepNumber = goToNextStep(currStepNumber);
    setBill();
  });

  step4Btn.addEventListener("click", () => {
    currStepNumber = goToNextStep(currStepNumber);
  });

  step3options.forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.toggle("step-3-active");
      setTickIcon(option);
    });
  });

  function validateLoginCredentials() {
    let isNameValid = validateName();
    let isEmailValid = validateEmail();
    let isNumberValid = validateNumber();
    return isNameValid && isEmailValid && isNumberValid;
  }

  function checkIsEmpty(input, errorMsg) {
    if (!input.value) {
      errorMsg.textContent = "This field is required";
      errorMsg.style.display = "flex";
      input.style.borderColor = "var(--strawberry-red)";
      return true;
    } else {
      errorMsg.style.display = "none";
      input.style.borderColor = "var(--cool-gray)";
      return false;
    }
  }

  function validateName() {
    const nameInput = document.querySelector("#name");
    const errorMsg = document.querySelector(".error-msg-name");
    return !checkIsEmpty(nameInput, errorMsg);
  }

  function validateEmail() {
    const emailInput = document.querySelector("#email");
    const errorMsg = document.querySelector(".error-msg-email");
    let isEmpty = checkIsEmpty(emailInput, errorMsg);

    if (!isEmpty) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = regex.test(emailInput.value);
      if (!isValid) {
        errorMsg.style.display = "flex";
        errorMsg.textContent = "Enter a valid email";
        emailInput.style.borderColor = "var(--strawberry-red)";
      }
      return isValid;
    }
    return isEmpty;
  }

  function validateNumber() {
    const phoneInput = document.querySelector("#phone");
    const errorMsg = document.querySelector(".error-msg-number");
    let isEmpty = checkIsEmpty(phoneInput, errorMsg);

    if (!isEmpty) {
      let isValid = isNumeric(phoneInput.value);
      let isLengthValid = true;
      if (phoneInput.value.length != 10) {
        errorMsg.style.display = "flex";
        errorMsg.textContent = "Please enter a 10-digit phone number";
        phoneInput.style.borderColor = "var(--strawberry-red)";
        isValid = false;
        isLengthValid = false;
      }
      if (!isValid && isLengthValid) {
        errorMsg.style.display = "flex";
        errorMsg.textContent = "Enter a valid number";
        phoneInput.style.borderColor = "var(--strawberry-red)";
      }
      return isValid;
    }
    return isEmpty;
  }

  function isNumeric(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  }

  function setTickIcon(element) {
    const clickBox = element.querySelector(".click-option");
    if (clickBox.innerHTML === "") {
      clickBox.innerHTML =
        '<img src="./assets/images/icon-checkmark.svg" alt="">';
      clickBox.style.borderColor = "var(--purplish-blue)";
      clickBox.style.backgroundColor = "var(--purplish-blue)";
    } else {
      clickBox.innerHTML = "";
      clickBox.style.borderColor = "var(--light-gray)";
      clickBox.style.backgroundColor = "var(--white)";
    }
  }

  function goToNextStep(currStepNumber) {
    const currStep = document.querySelector(`.step-${currStepNumber}`);
    currStep.style.display = "none";

    currStepNumber++;
    const nextStep = document.querySelector(`.step-${currStepNumber}`);
    nextStep.style.display = "flex";
    return currStepNumber;
  }

  function goToPreviousStep(currStepNumber) {
    if (currStepNumber != 1) {
      const currStep = document.querySelector(`.step-${currStepNumber}`);
      currStep.style.display = "none";
      currStepNumber--;
      const prevStep = document.querySelector(`.step-${currStepNumber}`);
      prevStep.style.display = "flex";
    }
    return currStepNumber;
  }

  function setPlanDetails() {
    step2options.forEach((option) => {
      if (option.classList.contains("option-clicked")) {
        const Price = option.querySelector(".price-amt");
        planPrice = parseInt(Price.textContent);
        planName = option.querySelector(".planName").textContent;
      }
    });
  }

  function selectedAddons(addon) {
    if (addon.classList.contains("step-3-active")) {
      divider.style.display = "block";
      let selectedAddon = addon.querySelector(".add-on").textContent;
      let addonPrice = addon.querySelector(".add-on-price").textContent;
      if (planType === "Monthly") {
        addonPrice = `+${addonPrice}$/mo`;
      } else {
        addonPrice = `+${addonPrice * 10}$/yr`;
      }
      return { service: selectedAddon, serviceCost: addonPrice };
    }
    return { service: "", serviceCost: "" };
  }

  function setBill() {
    resetBill();
    finalPrice += planPrice;
    billPlanName.textContent = `${planName} (${planType})`;
    if (planType === "Monthly") {
      billPlanPrice.textContent = `$${planPrice}/mo`;
      totalText.textContent = "Total (per month)";
    } else {
      billPlanPrice.textContent = `$${planPrice}/yr`;
      totalText.textContent = "Total (per year)";
    }

    // Display Selected Addons
    step3options.forEach((addon) => {
      let { service, serviceCost } = selectedAddons(addon);
      if (service != "" && serviceCost != "") {
        setBillAddon(service, serviceCost);
        let addOnCost = parseInt(serviceCost.match(/\d+/)[0]);
        finalPrice += addOnCost;
      }
    });

    // Display Final Cost
    if (planType === "Monthly") {
      totalPrice.textContent = `$${finalPrice}/mo`;
    } else {
      totalPrice.textContent = `$${finalPrice}/yr`;
    }
  }

  function setBillAddon(service, price) {
    let addOn = document.createElement("div");
    addOn.classList.add("selected-add-on");
    finalAddonSection.appendChild(addOn);

    let text = document.createElement("p");
    text.classList.add("final-addon-text");
    text.textContent = service;
    addOn.appendChild(text);

    let serviceCost = document.createElement("p");
    serviceCost.classList.add("selected-addon-price");
    serviceCost.textContent = price;
    addOn.appendChild(serviceCost);
  }

  function resetBill() {
    finalPrice = 0;
    const addOnsSelected = document.querySelectorAll(".selected-add-on");
    addOnsSelected.forEach((addOn) => {
      addOn.style.display = "none";
      addOn.remove();
    });
  }
});
