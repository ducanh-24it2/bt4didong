(() => {
  const language = (navigator.languages?.[0] || navigator.language || "vi").toLowerCase().startsWith("vi") ? "vi" : "en";
  const t = {
    vi: { workspace:"KHÔNG GIAN LÀM VIỆC", allStudents:"Danh sách sinh viên", sidebarNote:"Một góc nhỏ dành cho những người làm nên lớp học.", savedLocally:"Đã lưu trên thiết bị", yourClass:"LỚP CỦA BẠN", rosterTitle:"Danh sách lớp nhỏ xinh", rosterSubtitle:"Tất cả sinh viên, gọn gàng trong một nơi.", addStudent:"Thêm sinh viên", studentsEnrolled:"sinh viên", withEmail:"có địa chỉ email", everyone:"Tất cả sinh viên", searchPlaceholder:"Tìm sinh viên...", sortName:"Tên", emptyTitle:"Một trang giấy mới.", emptyBody:"Lớp học của bạn đang chờ gặp sinh viên đầu tiên.", addFirstStudent:"Thêm sinh viên đầu tiên", footerMade:"Dành cho những khoảnh khắc tuyệt vời mỗi ngày trên lớp.", back:"Quay lại danh sách", studentDetails:"THÔNG TIN SINH VIÊN", editStudent:"Chỉnh sửa", deleteStudent:"Xóa", enrolled:"Đang theo học", fullName:"Họ và tên", studentId:"Mã số sinh viên", email:"Địa chỉ email", noEmail:"Chưa có email", addTitle:"Thêm sinh viên mới", editTitle:"Chỉnh sửa thông tin", addSubtitle:"Hãy bắt đầu làm quen với một gương mặt mới.", editSubtitle:"Cập nhật thông tin sinh viên bên dưới.", photo:"Ảnh đại diện", photoHint:"Ảnh JPG, PNG hoặc WEBP", upload:"Tải ảnh lên", useLink:"Dùng đường dẫn", removePhoto:"Xóa ảnh", namePlaceholder:"Ví dụ: Nguyễn Minh Anh", idPlaceholder:"Ví dụ: SV2024001", emailPlaceholder:"ten@example.com", photoUrlPlaceholder:"Dán đường dẫn ảnh...", requiredNote:"* Thông tin bắt buộc", cancel:"Hủy", create:"Thêm sinh viên", save:"Lưu thay đổi", confirmEdit:"Bạn có muốn sửa thông tin sinh viên không?", confirmDelete:"Bạn có muốn xóa sinh viên này không? Hành động này không thể hoàn tác.", yesEdit:"Có, lưu lại", yesDelete:"Có, xóa", no:"Không", created:"Đã thêm sinh viên mới.", updated:"Đã cập nhật thông tin sinh viên.", deleted:"Đã xóa sinh viên.", invalidImage:"Không thể đọc ảnh này.", invalidUrl:"Đường dẫn ảnh chưa hợp lệ.", nameRequired:"Vui lòng nhập họ tên sinh viên.", idRequired:"Vui lòng nhập mã số sinh viên.", idExists:"Mã số sinh viên này đã được sử dụng.", emailInvalid:"Vui lòng nhập địa chỉ email hợp lệ.", duplicateEmail:"Địa chỉ email này đã được sử dụng.", detailTitle:"Hồ sơ sinh viên", deleteTitle:"Xóa sinh viên?", editConfirmTitle:"Xác nhận chỉnh sửa", allCount:n=>`${n} sinh viên`, searchEmpty:"Không tìm thấy sinh viên phù hợp.", photoRemoved:"Đã xóa ảnh đại diện." },
    en: { workspace:"WORKSPACE", allStudents:"All students", sidebarNote:"A little space for the people who make a classroom.", savedLocally:"Saved on this device", yourClass:"YOUR CLASSROOM", rosterTitle:"A lovely little roster", rosterSubtitle:"All your students, together in one place.", addStudent:"Add student", studentsEnrolled:"students enrolled", withEmail:"with an email address", everyone:"Everyone", searchPlaceholder:"Search students...", sortName:"Name", emptyTitle:"A fresh page.", emptyBody:"Your classroom is waiting to meet its first student.", addFirstStudent:"Add your first student", footerMade:"Made for the everyday magic of teaching.", back:"Back to roster", studentDetails:"STUDENT DETAILS", editStudent:"Edit", deleteStudent:"Delete", enrolled:"Enrolled", fullName:"Full name", studentId:"Student ID", email:"Email address", noEmail:"No email provided", addTitle:"Add a new student", editTitle:"Edit student details", addSubtitle:"Let's get to know a new face.", editSubtitle:"Update this student's information below.", photo:"Profile photo", photoHint:"JPG, PNG or WEBP image", upload:"Upload photo", useLink:"Use a link", removePhoto:"Remove photo", namePlaceholder:"e.g. Alex Morgan", idPlaceholder:"e.g. STU2024001", emailPlaceholder:"name@example.com", photoUrlPlaceholder:"Paste an image link...", requiredNote:"* Required information", cancel:"Cancel", create:"Add student", save:"Save changes", confirmEdit:"Do you want to update this student's information?", confirmDelete:"Do you want to delete this student? This cannot be undone.", yesEdit:"Yes, save", yesDelete:"Yes, delete", no:"Cancel", created:"New student added.", updated:"Student details updated.", deleted:"Student deleted.", invalidImage:"This image could not be read.", invalidUrl:"Please enter a valid image link.", nameRequired:"Please enter the student's full name.", idRequired:"Please enter a student ID.", idExists:"This student ID is already in use.", emailInvalid:"Please enter a valid email address.", duplicateEmail:"This email address is already in use.", detailTitle:"Student profile", deleteTitle:"Delete student?", editConfirmTitle:"Confirm changes", allCount:n=>`${n} students`, searchEmpty:"No students match your search.", photoRemoved:"Profile photo removed." }
  }[language];
  document.documentElement.lang = language;
  document.getElementById("language-pill").textContent = language.toUpperCase();
  document.querySelector(".brand-label").innerHTML = language === "vi" ? "sổ<span>nhỏ</span>" : "little<span>roster</span>";
  document.title = language === "vi" ? "Sổ nhỏ · Quản lý sinh viên" : "Little Roster · Student directory";
  const appManifest = document.querySelector('link[rel="manifest"]');
  if (appManifest) appManifest.href = language === "vi" ? "manifest.vi.webmanifest" : "manifest.en.webmanifest";
  const translations = t;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = translations[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = translations[el.dataset.i18nPlaceholder]; });
  const date = new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", { day:"numeric", month:"short", year:"numeric" });
  document.getElementById("today").textContent = date.format(new Date());

  const KEY = "little-roster.students.v1";
  const palettes = ["avatar-0","avatar-1","avatar-2","avatar-3","avatar-4","avatar-5"];
  let students = loadStudents();
  let sortAscending = true;
  let currentId = null;
  let editingId = null;
  let draftPhoto = "";
  let confirmAction = null;
  let toastTimer;

  function loadStudents() {
    try { const parsed = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(parsed) ? parsed.filter(s => s && s.id && s.name) : []; }
    catch { return []; }
  }
  function persist() { localStorage.setItem(KEY, JSON.stringify(students)); }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function initials(name) { return name.trim().split(/\s+/).slice(-2).map(part => Array.from(part)[0] || "").join("").toLocaleUpperCase(); }
  function convertTelex(value) {
    const splitAt = value.search(/\s+[^\s]*$/);
    const prefix = splitAt < 0 ? "" : value.slice(0, splitAt + 1);
    let word = splitAt < 0 ? value : value.slice(splitAt + 1);
    const pairs = { aa:"â", aw:"ă", ee:"ê", oo:"ô", ow:"ơ", uw:"ư", dd:"đ" };
    word = word.replace(/aa|aw|ee|oo|ow|uw|dd/gi, pair => {
      const converted = pairs[pair.toLowerCase()];
      return pair === pair.toUpperCase() ? converted.toUpperCase() : pair[0] === pair[0].toUpperCase() ? converted[0].toUpperCase() + converted.slice(1) : converted;
    });
    const tones = { s:0, f:1, r:2, x:3, j:4 };
    const last = word.slice(-1).toLowerCase();
    if (Object.hasOwn(tones, last)) {
      const tone = tones[last];
      word = word.slice(0, -1);
      const forms = { a:["á","à","ả","ã","ạ"], ă:["ắ","ằ","ẳ","ẵ","ặ"], â:["ấ","ầ","ẩ","ẫ","ậ"], e:["é","è","ẻ","ẽ","ẹ"], ê:["ế","ề","ể","ễ","ệ"], i:["í","ì","ỉ","ĩ","ị"], o:["ó","ò","ỏ","õ","ọ"], ô:["ố","ồ","ổ","ỗ","ộ"], ơ:["ớ","ờ","ở","ỡ","ợ"], u:["ú","ù","ủ","ũ","ụ"], ư:["ứ","ừ","ử","ữ","ự"], y:["ý","ỳ","ỷ","ỹ","ỵ"] };
      for (let i = word.length - 1; i >= 0; i--) {
        const vowel = forms[word[i].toLowerCase()];
        if (vowel) { const marked = vowel[tone]; word = word.slice(0, i) + (word[i] === word[i].toUpperCase() ? marked.toUpperCase() : marked) + word.slice(i + 1); break; }
      }
    }
    return prefix + word;
  }
  function byId(id) { return students.find(s => s.id === id); }
  function avatarMarkup(s, extra = "") { const color = palettes[s.colorIndex % palettes.length]; return s.photo ? `<img class="student-avatar ${color} ${extra}" src="${escapeHtml(s.photo)}" alt="${escapeHtml(s.name)}" onerror="this.outerHTML='<span class=\'student-avatar ${color} ${extra}\'>${escapeHtml(initials(s.name))}</span>'">` : `<span class="student-avatar ${color} ${extra}">${escapeHtml(initials(s.name))}</span>`; }
  function renderList() {
    const grid = document.getElementById("student-grid");
    const query = document.getElementById("search-input").value.trim().toLocaleLowerCase();
    const list = students.filter(s => [s.name,s.id,s.email].some(value => String(value || "").toLocaleLowerCase().includes(query))).sort((a,b) => a.name.localeCompare(b.name, language === "vi" ? "vi" : "en", {sensitivity:"base"}) * (sortAscending ? 1 : -1));
    document.getElementById("total-count").textContent = students.length;
    document.getElementById("email-count").textContent = students.filter(s => s.email).length;
    document.getElementById("side-count").textContent = students.length;
    document.getElementById("result-count").textContent = t.allCount(list.length);
    document.getElementById("empty-state").hidden = list.length > 0;
    grid.hidden = list.length === 0;
    if (!list.length) {
      document.querySelector(".empty-state p").textContent = students.length ? t.searchEmpty : t.emptyBody;
      document.querySelector(".empty-state h2").textContent = students.length ? (language === "vi" ? "Chưa có kết quả." : "No matches just yet.") : t.emptyTitle;
      document.getElementById("empty-add").hidden = students.length > 0;
    }
    grid.innerHTML = list.map(s => `<article class="student-card" data-open="${escapeHtml(s.id)}" tabindex="0" aria-label="${escapeHtml(s.name)}"><div class="card-top">${avatarMarkup(s)}<button class="card-more" data-more="${escapeHtml(s.id)}" aria-label="${escapeHtml(s.name)}">···</button></div><div class="student-name">${escapeHtml(s.name)}</div><div class="student-id">${escapeHtml(s.id)}</div><div class="card-divider"></div><div class="card-email"><span class="email-glyph">✉</span><span>${escapeHtml(s.email || t.noEmail)}</span></div></article>`).join("");
    grid.querySelectorAll("[data-open]").forEach(card => { card.addEventListener("click", () => showDetail(card.dataset.open)); card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showDetail(card.dataset.open); } }); });
    grid.querySelectorAll("[data-more]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); showDetail(button.dataset.more); }));
  }
  function setView(name) { ["list-view","detail-view","editor-view"].forEach(id => { document.getElementById(id).hidden = id !== `${name}-view`; }); window.scrollTo({top:0,behavior:"smooth"}); }
  function showList() { renderList(); setView("list"); currentId = null; editingId = null; }
  function showDetail(id) {
    const s = byId(id); if (!s) return showList(); currentId = id;
    document.getElementById("detail-view").innerHTML = `<button class="back-button" id="detail-back"><span>←</span>${t.back}</button><div class="detail-heading"><div><div class="eyebrow"><span class="eyebrow-dot"></span>${t.studentDetails}</div><h1>${t.detailTitle}<span class="title-period">.</span></h1></div><div class="detail-actions"><button class="button button-danger-outline" id="detail-delete">${t.deleteStudent}</button><button class="button button-primary" id="detail-edit"><span>✎</span>${t.editStudent}</button></div></div><div class="detail-card">${avatarMarkup(s,"detail-avatar")}<div class="detail-info"><h2 class="detail-name">${escapeHtml(s.name)}</h2><span class="detail-id">${escapeHtml(s.id)}</span></div><span class="detail-badge"><span class="sync-dot"></span> ${t.enrolled}</span></div><div class="detail-fields"><div class="detail-field"><span class="field-label">${t.fullName}</span><span class="field-value">${escapeHtml(s.name)}</span></div><div class="detail-field"><span class="field-label">${t.studentId}</span><span class="field-value">${escapeHtml(s.id)}</span></div><div class="detail-field"><span class="field-label">${t.email}</span><span class="field-value">${escapeHtml(s.email || t.noEmail)}</span></div></div>`;
    document.getElementById("detail-back").onclick = showList;
    document.getElementById("detail-edit").onclick = () => showEditor(id);
    document.getElementById("detail-delete").onclick = () => confirm("delete", id);
    setView("detail");
  }
  function showEditor(id = null) {
    editingId = id; const s = id ? byId(id) : null; if (id && !s) return showList(); draftPhoto = s?.photo || "";
    const color = s ? palettes[s.colorIndex % palettes.length] : "avatar-0";
    const preview = draftPhoto ? `<img class="photo-preview ${color}" src="${escapeHtml(draftPhoto)}" alt="">` : `<div class="photo-preview ${color}">${s ? escapeHtml(initials(s.name)) : "✿"}</div>`;
    document.getElementById("editor-view").innerHTML = `<button class="back-button" id="editor-back"><span>←</span>${t.back}</button><div class="editor-heading"><div><div class="eyebrow"><span class="eyebrow-dot"></span>${t.studentDetails}</div><h1>${s ? t.editTitle : t.addTitle}<span class="title-period">.</span></h1><p class="page-subtitle">${s ? t.editSubtitle : t.addSubtitle}</p></div></div><form class="editor-card" id="student-form" novalidate><div class="photo-row">${preview}<div class="photo-actions"><div class="photo-title">${t.photo}</div><div class="photo-hint">${t.photoHint}</div><div class="photo-buttons"><button type="button" class="mini-button" id="upload-photo">＋ ${t.upload}</button><button type="button" class="mini-button" id="photo-link">↗ ${t.useLink}</button><button type="button" class="mini-button text-button" id="remove-photo">${t.removePhoto}</button></div><input type="file" id="photo-file" accept="image/png,image/jpeg,image/webp,image/gif" hidden></div></div><div class="form-grid"><div class="form-field full"><label for="student-name">${t.fullName} <span class="required">*</span></label><input id="student-name" name="name" maxlength="100" lang="vi" inputmode="text" autocapitalize="words" spellcheck="true" placeholder="${t.namePlaceholder}" value="${escapeHtml(s?.name || "")}" autocomplete="name"><div class="telex-tools"><button type="button" class="mini-button" id="telex-toggle" aria-pressed="true">${language === "vi" ? "Telex: BẬT" : "Vietnamese Telex: ON"}</button><span>${language === "vi" ? "Telex: aa â, aw ă, dd đ; s sắc, f huyền, r hỏi, x ngã, j nặng" : "Telex: aa â, aw ă, dd đ; s acute, f grave, r hook, x tilde, j dot"}</span></div><span class="form-error" id="name-error"></span></div><div class="form-field"><label for="student-id">${t.studentId} <span class="required">*</span></label><input id="student-id" name="id" maxlength="40" placeholder="${t.idPlaceholder}" value="${escapeHtml(s?.id || "")}"><span class="form-error" id="id-error"></span></div><div class="form-field"><label for="student-email">${t.email}</label><input id="student-email" name="email" type="email" maxlength="160" placeholder="${t.emailPlaceholder}" value="${escapeHtml(s?.email || "")}" autocomplete="email"><span class="form-error" id="email-error"></span></div></div><div class="form-footer"><span class="required-note">${t.requiredNote}</span><div class="form-actions"><button type="button" class="button button-quiet" id="editor-cancel">${t.cancel}</button><button type="submit" class="button button-primary"><span>${s ? "✓" : "+"}</span>${s ? t.save : t.create}</button></div></div></form>`;
    document.getElementById("editor-back").onclick = () => s ? showDetail(id) : showList();
    document.getElementById("editor-cancel").onclick = () => s ? showDetail(id) : showList();
    const fileInput = document.getElementById("photo-file");
    document.getElementById("upload-photo").onclick = () => fileInput.click();
    fileInput.onchange = () => { const file = fileInput.files?.[0]; if (!file) return; if (!file.type.startsWith("image/")) return notify(t.invalidImage); const reader = new FileReader(); reader.onload = () => { draftPhoto = reader.result; refreshPreview(color); }; reader.onerror = () => notify(t.invalidImage); reader.readAsDataURL(file); };
    document.getElementById("photo-link").onclick = () => { const url = window.prompt(t.photoUrlPlaceholder, draftPhoto.startsWith("data:") ? "" : draftPhoto); if (url === null) return; if (url.trim() && !/^https?:\/\//i.test(url.trim())) return notify(t.invalidUrl); draftPhoto = url.trim(); refreshPreview(color); };
    document.getElementById("remove-photo").onclick = () => { draftPhoto = ""; refreshPreview(color); notify(t.photoRemoved); };
    function refreshPreview(palette) { const holder = document.querySelector(".photo-preview"); if (draftPhoto) { const img = document.createElement("img"); img.className = `photo-preview ${palette}`; img.alt = ""; img.src = draftPhoto; img.onerror = () => notify(t.invalidUrl); holder.replaceWith(img); } else { const div = document.createElement("div"); div.className = `photo-preview ${palette}`; div.textContent = document.getElementById("student-name").value ? initials(document.getElementById("student-name").value) : "✿"; holder.replaceWith(div); } }
    const nameInput = document.getElementById("student-name");
    let telexEnabled = true;
    const telexButton = document.getElementById("telex-toggle");
    telexButton.onclick = () => { telexEnabled = !telexEnabled; telexButton.setAttribute("aria-pressed", String(telexEnabled)); telexButton.textContent = language === "vi" ? `Telex: ${telexEnabled ? "BẬT" : "TẮT"}` : `Vietnamese Telex: ${telexEnabled ? "ON" : "OFF"}`; };
    let composingName = false;
    nameInput.addEventListener("compositionstart", () => { composingName = true; });
    nameInput.addEventListener("compositionend", () => { composingName = false; if (!draftPhoto) refreshPreview(color); });
    nameInput.addEventListener("input", () => { if (composingName) return; if (telexEnabled && nameInput.selectionStart === nameInput.value.length) { const converted = convertTelex(nameInput.value); if (converted !== nameInput.value) { const cursor = converted.length; nameInput.value = converted; nameInput.setSelectionRange(cursor,cursor); } } if (!draftPhoto) refreshPreview(color); });
    document.getElementById("student-form").onsubmit = event => { event.preventDefault(); saveStudent(id); };
    setView("editor"); document.getElementById("student-name").focus();
  }
  function validate(name, id, email) {
    let valid = true; const showError = (field, message) => { document.getElementById(`${field}-error`).textContent = message; if (message) valid = false; };
    showError("name", name ? "" : t.nameRequired);
    showError("id", id ? "" : t.idRequired);
    if (id && students.some(s => s.id.toLocaleLowerCase() === id.toLocaleLowerCase() && s.id !== editingId)) showError("id", t.idExists);
    showError("email", email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? t.emailInvalid : "");
    if (email && students.some(s => s.email?.toLocaleLowerCase() === email.toLocaleLowerCase() && s.id !== editingId)) showError("email", t.duplicateEmail);
    return valid;
  }
  function saveStudent(id) {
    const name = document.getElementById("student-name").value.trim();
    const studentId = document.getElementById("student-id").value.trim();
    const email = document.getElementById("student-email").value.trim();
    if (!validate(name,studentId,email)) return;
    const old = id ? byId(id) : null;
    const entry = { name, id:studentId, email, photo:draftPhoto, colorIndex:old?.colorIndex ?? students.length % palettes.length };
    if (old) confirm("edit", id, entry); else { students.push(entry); persist(); showList(); notify(t.created); }
  }
  function confirm(action, id, entry = null) {
    confirmAction = () => {
      if (action === "delete") { students = students.filter(s => s.id !== id); persist(); showList(); notify(t.deleted); }
      else if (action === "edit") { students = students.map(s => s.id === id ? entry : s); persist(); showDetail(id); notify(t.updated); }
      closeConfirm();
    };
    const deleting = action === "delete";
    document.getElementById("confirm-icon").textContent = deleting ? "⌫" : "✳";
    document.getElementById("confirm-icon").style.background = deleting ? "#f6eae7" : "#edf3ed";
    document.getElementById("confirm-icon").style.color = deleting ? "#b67168" : "#6d8872";
    document.getElementById("confirm-title").textContent = deleting ? t.deleteTitle : t.editConfirmTitle;
    document.getElementById("confirm-copy").textContent = deleting ? t.confirmDelete : t.confirmEdit;
    document.getElementById("cancel-confirm").textContent = t.no;
    const accept = document.getElementById("accept-confirm"); accept.textContent = deleting ? t.yesDelete : t.yesEdit; accept.className = `button ${deleting ? "button-danger" : "button-primary"}`;
    document.getElementById("confirm-modal").hidden = false; accept.focus();
  }
  function closeConfirm() { document.getElementById("confirm-modal").hidden = true; confirmAction = null; }
  function notify(message) { const toast = document.getElementById("toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2400); }
  document.getElementById("add-button").onclick = () => showEditor();
  document.getElementById("empty-add").onclick = () => showEditor();
  document.getElementById("nav-roster").onclick = showList;
  document.getElementById("search-input").addEventListener("input", renderList);
  document.getElementById("sort-button").onclick = () => { sortAscending = !sortAscending; renderList(); };
  document.getElementById("cancel-confirm").onclick = closeConfirm;
  document.getElementById("accept-confirm").onclick = () => confirmAction?.();
  document.getElementById("confirm-modal").addEventListener("click", event => { if (event.target.id === "confirm-modal") closeConfirm(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { if (!document.getElementById("confirm-modal").hidden) closeConfirm(); else if (!document.getElementById("detail-view").hidden || !document.getElementById("editor-view").hidden) showList(); } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("search-input").focus(); } });
  renderList();
  if ("serviceWorker" in navigator && location.protocol === "http:" && ["localhost", "127.0.0.1"].includes(location.hostname)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  }
})();
