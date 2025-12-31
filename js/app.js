let contactNameInput = document.getElementById("contactName");
let contactPhoneInput = document.getElementById("contactPhone");
let contactEmailInput = document.getElementById("contactEmail");
let contactAddressInput = document.getElementById("contactAddress");
let contactNotesInput = document.getElementById("contactNotes");
let contactGroupInput = document.getElementById("contactGroup");
let contactFavoriteInput = document.getElementById("contactFavorite");
let contactEmergencyInput = document.getElementById("contactEmergency");
let avatarInput = document.getElementById("avatarInput");
let searchInput = document.getElementById("searchInput");
let btnAddContact = document.getElementById("addContactBtn");
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");
let currentIndex = 0;
let contactList = [];
let avatarPath = "";

if (localStorage.getItem("contactContainer") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactContainer"));
  displayData();
  displayFavorites();
  displayEmergency();
  displayStats();
}

function addContact() {
  if (validationName() && validationPhone()) {
    let contact = {
      name: contactNameInput.value.trim(),
      phone: contactPhoneInput.value.trim(),
      email: contactEmailInput.value.trim(),
      address: contactAddressInput.value.trim(),
      notes: contactNotesInput.value.trim(),
      group: contactGroupInput.value,
      avatar: avatarPath || "",
      isFavorite: contactFavoriteInput.checked,
      isEmergency: contactEmergencyInput.checked
    };

    contactList.push(contact);

    localStorage.setItem("contactContainer", JSON.stringify(contactList));

    displayData();
    displayFavorites();
    displayEmergency();
    displayStats();

    clearForm();
    closeModal();
  }
}

function displayData() {
  let cartona = "";
  for (let i = 0; i < contactList.length; i++) {
    cartona += createCols(i);
  }

  if (cartona === "") {
    cartona = `
      <div class="col-12">
        <div class="empty-state">
          <div class="empty-state-icon">
            <i class="fa-solid fa-address-book"></i>
          </div>
          <p class="empty-state-title">No contacts found</p>
          <p class="empty-state-subtitle">Click "Add Contact" to get started</p>
        </div>
      </div>
    `;
  }

  document.getElementById("contactsContainer").innerHTML = cartona;
}

function searchData() {
  let term = searchInput.value;
  let cartona = "";

  for (let i = 0; i < contactList.length; i++) {
    let nameMatch = contactList[i].name.toLowerCase().includes(term.toLowerCase());
    let phoneMatch = contactList[i].phone.includes(term);
    let emailMatch = contactList[i].email.toLowerCase().includes(term.toLowerCase());

    if (nameMatch || phoneMatch || emailMatch) {
      cartona += createCols(i);
    }
  }

  if (cartona === "") {
    cartona = `
      <div class="col-12">
        <div class="empty-state">
          <div class="empty-state-icon">
            <i class="fa-solid fa-address-book"></i>
          </div>
          <p class="empty-state-title">No contacts found</p>
          <p class="empty-state-subtitle">Try a different search term</p>
        </div>
      </div>
    `;
  }

  document.getElementById("contactsContainer").innerHTML = cartona;
}

function createCols(i) {
  let contact = contactList[i];
  let favoriteIcon = contact.isFavorite ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
  let favoriteClass = contact.isFavorite ? "active" : "";
  let emergencyIcon = contact.isEmergency ? '<i class="fa-solid fa-heart-pulse"></i>' : '<i class="fa-regular fa-heart"></i>';
  let emergencyClass = contact.isEmergency ? "active" : "";

  let emergencyBadge = contact.isEmergency
    ? '<span class="contact-tag contact-tag-emergency"><i class="fa-solid fa-heart-pulse me-1"></i>Emergency</span>'
    : "";
  let groupBadge = contact.group ? `<span class="contact-tag group-badge-${contact.group}">${contact.group}</span>` : "";

  let emailSection = contact.email
    ? `<div class="contact-detail-item">
        <div class="contact-detail-icon contact-detail-icon-email">
          <i class="fa-solid fa-envelope"></i>
        </div>
        <span class="text-truncate">${contact.email}</span>
      </div>`
    : "";

  let addressSection = contact.address
    ? `<div class="contact-detail-item">
        <div class="contact-detail-icon contact-detail-icon-address">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <span class="text-truncate">${contact.address}</span>
      </div>`
    : "";

  let tagsSection = emergencyBadge || groupBadge ? `<div class="contact-tags">${groupBadge}${emergencyBadge}</div>` : "";

  let emailButton = contact.email
    ? `<button onclick="emailContact(${i})" class="contact-action-btn contact-action-btn-email" title="Email">
        <i class="fa-solid fa-envelope"></i>
      </button>`
    : "";

  let avatarHTML = contact.avatar
    ? `<img src="${contact.avatar}" alt="${contact.name}" class="contact-avatar" style="width: 56px; height: 56px; object-fit: cover; border-radius: 0.5rem;">`
    : `<div class="contact-avatar" style="width: 56px; height: 56px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.25rem; border-radius: 0.5rem;">${contact.name.charAt(0).toUpperCase()}</div>`;

  let emergencyBadgeHTML = contact.isEmergency
    ? '<div class="contact-avatar-badge contact-avatar-badge-emergency"><i class="fa-solid fa-heart-pulse"></i></div>'
    : "";
  let favoriteBadgeHTML = contact.isFavorite
    ? '<div class="contact-avatar-badge contact-avatar-badge-favorite"><i class="fa-solid fa-star"></i></div>'
    : "";

  return `
    <div class="col-12 col-sm-6 col-xl-6">
      <div class="contact-card">
        <div class="d-flex align-items-start gap-3 mb-3">
          <div class="position-relative">
            ${avatarHTML}
            ${emergencyBadgeHTML}
            ${favoriteBadgeHTML}
          </div>
          <div class="flex-grow-1 min-w-0">
            <h3 class="contact-name">${contact.name}</h3>
            <div class="contact-phone">
              <div class="contact-phone-icon">
                <i class="fa-solid fa-phone"></i>
              </div>
              <span class="text-truncate">${contact.phone}</span>
            </div>
          </div>
        </div>
        
        ${emailSection || addressSection ? `<div class="contact-details">${emailSection}${addressSection}</div>` : ""}
        
        ${tagsSection}
        
        <div class="contact-actions">
          <div class="d-flex gap-2">
            <a href="tel:${contact.phone}" class="contact-action-btn contact-action-btn-call" title="Call">
              <i class="fa-solid fa-phone"></i>
            </a>
            ${emailButton}
          </div>
          <div class="d-flex gap-2">
            <button onclick="toggleFavorite(${i})" class="contact-action-btn contact-action-btn-favorite ${favoriteClass}" title="Favorite">
              ${favoriteIcon}
            </button>
            <button onclick="toggleEmergency(${i})" class="contact-action-btn contact-action-btn-emergency ${emergencyClass}" title="Emergency">
              ${emergencyIcon}
            </button>
            <button onclick="setUpdateInfo(${i})" class="contact-action-btn contact-action-btn-edit" title="Edit">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onclick="deleteItem(${i})" class="contact-action-btn contact-action-btn-delete" title="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function displayFavorites() {
  let favoritesHTML = "";
  let favoritesMobileHTML = "";

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].isFavorite) {
      let contact = contactList[i];
      let avatarHTML = contact.avatar
        ? `<img src="${contact.avatar}" alt="${contact.name}" class="sidebar-item-avatar" style="width: 40px; height: 40px; object-fit: cover; border-radius: 0.5rem;">`
        : `<div class="sidebar-item-avatar" style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem; border-radius: 0.5rem;">${contact.name.charAt(0).toUpperCase()}</div>`;

      favoritesHTML += `
        <div class="sidebar-item sidebar-item-amber" onclick="window.location.href='tel:${contact.phone}'">
          ${avatarHTML}
          <div class="sidebar-item-info">
            <div class="sidebar-item-name">${contact.name}</div>
            <div class="sidebar-item-phone">${contact.phone}</div>
          </div>
          <div class="sidebar-item-action sidebar-item-action-amber">
            <i class="fa-solid fa-phone"></i>
          </div>
        </div>
      `;

      favoritesMobileHTML += `
        <div class="col-6 mb-2">
          <a href="tel:${contact.phone}" class="text-decoration-none">
            <div class="d-flex align-items-center gap-2 p-2 bg-white border border-gray-200 rounded contact-card">
              ${avatarHTML}
              <div class="flex-grow-1 min-w-0">
                <div class="sidebar-item-name">${contact.name}</div>
                <div class="sidebar-item-phone">${contact.phone}</div>
              </div>
              <div class="contact-action-btn contact-action-btn-call">
                <i class="fa-solid fa-phone"></i>
              </div>
            </div>
          </a>
        </div>
      `;
    }
  }

  if (favoritesHTML === "") {
    favoritesHTML = '<div class="text-center py-4"><p class="text-muted small mb-0">No favorites yet</p></div>';
    favoritesMobileHTML = '<div class="text-center py-4"><p class="text-muted small mb-0">No favorites yet</p></div>';
  } else {
    favoritesMobileHTML = `<div class="row g-2">${favoritesMobileHTML}</div>`;
  }

  let favoritesSection = document.getElementById("favoritesSection");
  if (favoritesSection) favoritesSection.innerHTML = favoritesHTML;

  let favoritesSectionMobile = document.getElementById("favoritesSectionMobile");
  if (favoritesSectionMobile) favoritesSectionMobile.innerHTML = favoritesMobileHTML;
}

function displayEmergency() {
  let emergencyHTML = "";
  let emergencyMobileHTML = "";

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].isEmergency) {
      let contact = contactList[i];
      let avatarHTML = contact.avatar
        ? `<img src="${contact.avatar}" alt="${contact.name}" class="sidebar-item-avatar" style="width: 40px; height: 40px; object-fit: cover; border-radius: 0.5rem;">`
        : `<div class="sidebar-item-avatar" style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem; border-radius: 0.5rem;">${contact.name.charAt(0).toUpperCase()}</div>`;

      emergencyHTML += `
        <div class="sidebar-item sidebar-item-rose" onclick="window.location.href='tel:${contact.phone}'">
          ${avatarHTML}
          <div class="sidebar-item-info">
            <div class="sidebar-item-name">${contact.name}</div>
            <div class="sidebar-item-phone">${contact.phone}</div>
          </div>
          <div class="sidebar-item-action sidebar-item-action-rose">
            <i class="fa-solid fa-phone"></i>
          </div>
        </div>
      `;

      emergencyMobileHTML += `
        <div class="col-6 mb-2">
          <a href="tel:${contact.phone}" class="text-decoration-none">
            <div class="d-flex align-items-center gap-2 p-2 bg-white border border-gray-200 rounded contact-card">
              ${avatarHTML}
              <div class="flex-grow-1 min-w-0">
                <div class="sidebar-item-name">${contact.name}</div>
                <div class="sidebar-item-phone">${contact.phone}</div>
              </div>
              <div class="contact-action-btn contact-action-btn-call">
                <i class="fa-solid fa-phone"></i>
              </div>
            </div>
          </a>
        </div>
      `;
    }
  }

  if (emergencyHTML === "") {
    emergencyHTML = '<div class="text-center py-4"><p class="text-muted small mb-0">No emergency contacts</p></div>';
    emergencyMobileHTML = '<div class="text-center py-4"><p class="text-muted small mb-0">No emergency contacts</p></div>';
  } else {
    emergencyMobileHTML = `<div class="row g-2">${emergencyMobileHTML}</div>`;
  }

  let emergencySection = document.getElementById("emergencySection");
  if (emergencySection) emergencySection.innerHTML = emergencyHTML;

  let emergencySectionMobile = document.getElementById("emergencySectionMobile");
  if (emergencySectionMobile) emergencySectionMobile.innerHTML = emergencyMobileHTML;
}

function displayStats() {
  let total = contactList.length;
  let favorites = 0;
  let emergency = 0;

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].isFavorite) favorites++;
    if (contactList[i].isEmergency) emergency++;
  }

  document.getElementById("totalCount").textContent = total;
  document.getElementById("favoritesCount").textContent = favorites;
  document.getElementById("emergencyCount").textContent = emergency;
}

function deleteItem(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);

      localStorage.setItem("contactContainer", JSON.stringify(contactList));

      displayData();
      displayFavorites();
      displayEmergency();
      displayStats();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Contact has been deleted.",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

function toggleFavorite(index) {
  contactList[index].isFavorite = !contactList[index].isFavorite;

  localStorage.setItem("contactContainer", JSON.stringify(contactList));

  displayData();
  displayFavorites();
  displayStats();
}

function toggleEmergency(index) {
  contactList[index].isEmergency = !contactList[index].isEmergency;

  localStorage.setItem("contactContainer", JSON.stringify(contactList));

  displayData();
  displayEmergency();
  displayStats();
}

function emailContact(index) {
  let contact = contactList[index];
  if (!contact.email) {
    Swal.fire({
      icon: "warning",
      title: "No Email",
      text: "This contact does not have an email address."
    });
    return;
  }
  window.location.href = `mailto:${contact.email}`;
}

function clearForm() {
  contactNameInput.value = null;
  contactPhoneInput.value = null;
  contactEmailInput.value = null;
  contactAddressInput.value = null;
  contactNotesInput.value = null;
  contactGroupInput.value = null;
  contactFavoriteInput.checked = false;
  contactEmergencyInput.checked = false;
  avatarInput.value = null;
  avatarPath = "";

  contactNameInput.classList.remove("is-valid");
  contactNameInput.classList.remove("is-invalid");
  contactPhoneInput.classList.remove("is-valid");
  contactPhoneInput.classList.remove("is-invalid");
  contactEmailInput.classList.remove("is-valid");
  contactEmailInput.classList.remove("is-invalid");

  let avatarPreview = document.getElementById("avatarPreview");
  avatarPreview.innerHTML = '<i class="fa-solid fa-user"></i>';
  avatarPreview.style.background = "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)";
  avatarPreview.style.borderRadius = "50%";
}

function openAddModal() {
  document.getElementById("modalTitle").textContent = "Add New Contact";
  clearForm();
  let modal = new bootstrap.Modal(document.getElementById("contactModal"));
  modal.show();
}

function closeModal() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
  if (modal) modal.hide();
}

function setUpdateInfo(index) {
  currentIndex = index;

  contactNameInput.value = contactList[index].name;
  contactPhoneInput.value = contactList[index].phone;
  contactEmailInput.value = contactList[index].email;
  contactAddressInput.value = contactList[index].address;
  contactNotesInput.value = contactList[index].notes;
  contactGroupInput.value = contactList[index].group;
  contactFavoriteInput.checked = contactList[index].isFavorite;
  contactEmergencyInput.checked = contactList[index].isEmergency;
  avatarPath = contactList[index].avatar;

  let avatarPreview = document.getElementById("avatarPreview");
  if (contactList[index].avatar) {
    avatarPreview.innerHTML = `<img src="${contactList[index].avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 1.25rem;">`;
    avatarPreview.style.background = "transparent";
  } else {
    let initials = contactList[index].name.charAt(0).toUpperCase();
    avatarPreview.innerHTML = initials;
    avatarPreview.style.background = "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)";
    avatarPreview.style.borderRadius = "50%";
  }

  document.getElementById("modalTitle").textContent = "Edit Contact";

  btnAdd.classList.add("d-none");
  if (btnUpdate) btnUpdate.classList.remove("d-none");

  let modal = new bootstrap.Modal(document.getElementById("contactModal"));
  modal.show();
}

function updateData() {
  if (validationName() && validationPhone()) {
    let contact = {
      name: contactNameInput.value.trim(),
      phone: contactPhoneInput.value.trim(),
      email: contactEmailInput.value.trim(),
      address: contactAddressInput.value.trim(),
      notes: contactNotesInput.value.trim(),
      group: contactGroupInput.value,
      avatar: avatarPath || contactList[currentIndex].avatar,
      isFavorite: contactFavoriteInput.checked,
      isEmergency: contactEmergencyInput.checked
    };

    contactList.splice(currentIndex, 1, contact);

    localStorage.setItem("contactContainer", JSON.stringify(contactList));

    displayData();
    displayFavorites();
    displayEmergency();
    displayStats();

    clearForm();
    closeModal();

    btnAdd.classList.remove("d-none");
    if (btnUpdate) btnUpdate.classList.add("d-none");

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Contact has been updated successfully.",
      timer: 1500,
      showConfirmButton: false
    });
  }
}

function handleAvatarChange() {
  let file = avatarInput.files[0];
  if (file) {
    let fileName = file.name;
    avatarPath = `./avatars/${fileName}`;

    let reader = new FileReader();
    reader.onload = function(event) {
      let avatarPreview = document.getElementById("avatarPreview");
      avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 1.25rem;">`;
      avatarPreview.style.background = "transparent";
    };
    reader.readAsDataURL(file);
  }
}

function validationName() {
  let regex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
  let text = contactNameInput.value.trim();
  let msgName = document.getElementById("contactNameError");

  if (regex.test(text)) {
    contactNameInput.classList.add("is-valid");
    contactNameInput.classList.remove("is-invalid");
    if (msgName) msgName.classList.add("d-none");
    return true;
  } else {
    contactNameInput.classList.add("is-invalid");
    contactNameInput.classList.remove("is-valid");
    if (msgName) msgName.classList.remove("d-none");
    return false;
  }
}

function validationPhone() {
  let regex = /^(\+20|0020|20)?0?1[0125][0-9]{8}$/;
  let text = contactPhoneInput.value.trim();
  let msgPhone = document.getElementById("contactPhoneError");

  let normalizedPhone = text.replace(/[\s\-\(\)\+]/g, "");
  for (let i = 0; i < contactList.length; i++) {
    if (currentIndex !== i) {
      let contactPhone = contactList[i].phone.replace(/[\s\-\(\)\+]/g, "");
      if (contactPhone === normalizedPhone) {
        contactPhoneInput.classList.add("is-invalid");
        contactPhoneInput.classList.remove("is-valid");
        if (msgPhone) {
          msgPhone.textContent = `A contact with this phone number already exists: ${contactList[i].name}`;
          msgPhone.classList.remove("d-none");
        }
        return false;
      }
    }
  }

  if (regex.test(text)) {
    contactPhoneInput.classList.add("is-valid");
    contactPhoneInput.classList.remove("is-invalid");
    if (msgPhone) msgPhone.classList.add("d-none");
    return true;
  } else {
    contactPhoneInput.classList.add("is-invalid");
    contactPhoneInput.classList.remove("is-valid");
    if (msgPhone) {
      msgPhone.textContent = "Please enter a valid Egyptian phone number (e.g., 01012345678)";
      msgPhone.classList.remove("d-none");
    }
    return false;
  }
}

function validationEmail() {
  let regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  let text = contactEmailInput.value.trim();
  let msgEmail = document.getElementById("contactEmailError");

  if (text === "" || regex.test(text)) {
    contactEmailInput.classList.add("is-valid");
    contactEmailInput.classList.remove("is-invalid");
    if (msgEmail) msgEmail.classList.add("d-none");
    return true;
  } else {
    contactEmailInput.classList.add("is-invalid");
    contactEmailInput.classList.remove("is-valid");
    if (msgEmail) msgEmail.classList.remove("d-none");
    return false;
  }
}

if (btnAddContact) {
  btnAddContact.addEventListener("click", function() {
    openAddModal();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", function() {
    searchData();
  });
}

let contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (btnUpdate && !btnUpdate.classList.contains("d-none")) {
      updateData();
    } else {
      addContact();
    }
  });
}

if (avatarInput) {
  avatarInput.addEventListener("change", function() {
    handleAvatarChange();
  });
}

if (contactNameInput) {
  contactNameInput.addEventListener("input", function() {
    validationName();
  });
}

if (contactPhoneInput) {
  contactPhoneInput.addEventListener("input", function() {
    validationPhone();
  });
}

if (contactEmailInput) {
  contactEmailInput.addEventListener("input", function() {
    validationEmail();
  });
}

window.toggleFavorite = toggleFavorite;
window.toggleEmergency = toggleEmergency;
window.setUpdateInfo = setUpdateInfo;
window.deleteItem = deleteItem;
window.emailContact = emailContact;
