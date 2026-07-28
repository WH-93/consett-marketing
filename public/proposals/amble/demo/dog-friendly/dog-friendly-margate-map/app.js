// ── State ──────────────────────────────
let map = null;
let venues = [];
let markers = [];
let selectedMarker = null;
let userLocation = null;
let activeFilter = null;
let activeVenueId = null;

// Category config
const CATEGORIES = {
  pub:    { icon: '🍺', label: 'Pubs' },
  cafe:   { icon: '☕', label: 'Cafes' },
  vet:    { icon: '🏥', label: 'Vets' },
  walk:   { icon: '🐾', label: 'Walks' },
  groomer:{ icon: '✂️', label: 'Groomers' },
  'pet-shop': { icon: '🦴', label: 'Pet Shops' },
};

// ── Init ───────────────────────────────
async function init() {
  // Load venues
  const resp = await fetch('data/venues.json');
  venues = await resp.json();

  // Init map
  map = L.map('map', {
    center: [51.389, 1.382],
    zoom: 15,
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Render
  renderFilters();
  renderMarkers();
  renderVenueList();
  bindSheet();

  // Deep link
  const params = new URLSearchParams(window.location.search);
  if (params.has('venue')) {
    const venue = venues.find(v => v.id === params.get('venue'));
    if (venue) showVenueDetail(venue);
  }
}

// ── Markers ────────────────────────────
function renderMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const filtered = activeFilter
    ? venues.filter(v => v.category === activeFilter)
    : venues;

  filtered.forEach(v => {
    const icon = L.divIcon({
      className: `custom-marker ${v.category}`,
      html: CATEGORIES[v.category]?.icon || '🐕',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    const marker = L.marker([v.lat, v.lng], { icon }).addTo(map);
    marker.venueId = v.id;
    marker.on('click', () => {
      selectMarker(marker);
      showQuickView(v);
    });
    markers.push(marker);
  });

  updateSheetCount();
}

function selectMarker(marker) {
  if (selectedMarker) {
    const prevIcon = selectedMarker._icon;
    if (prevIcon) prevIcon.classList.remove('selected');
  }
  selectedMarker = marker;
  if (!marker) return;

  const icon = marker._icon;
  if (icon) icon.classList.add('selected');

  // Calculate visible map center using the TARGET preview sheet height,
  // not the current height (which hasn't animated yet).
  const previewHeight = Math.min(window.innerHeight * 0.42, 380);
  const mapHeight = map.getContainer().clientHeight;
  const visibleCenterY = (mapHeight - previewHeight) / 2;
  // Leaflet panBy: +Y pans south (shifts map content up on screen),
  // so to center the pin in the visible area above the sheet we use:
  const offsetY = (mapHeight / 2) - visibleCenterY;

  const targetLatLng = marker.getLatLng();
  const targetZoom = Math.max(map.getZoom(), 17);

  map.flyTo(targetLatLng, targetZoom, { duration: 0.5 });

  // After fly starts, shift the view so pin lands in visible center
  setTimeout(() => {
    map.panBy([0, offsetY], { animate: true, duration: 0.3 });
  }, 100);
}

function deselectAll() {
  if (selectedMarker) {
    const icon = selectedMarker._icon;
    if (icon) icon.classList.remove('selected');
    selectedMarker = null;
  }
}

// ── Filters ────────────────────────────
function renderFilters() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;

  // "All" pill
  let html = `<button class="filter-pill active" data-category="">All</button>`;

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    html += `<button class="filter-pill" data-category="${key}">${cat.icon} ${cat.label}</button>`;
  });

  bar.innerHTML = html;

  bar.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.category || null;
      renderMarkers();
      renderVenueList();
      deselectAll();
      collapseSheet();
    });
  });
}

// ── Bottom sheet ───────────────────────
function bindSheet() {
  const sheet = document.getElementById('sheet');
  const handle = document.getElementById('sheetHandle');
  let startY = 0;
  let startHeight = 0;
  let dragging = false;

  handle.addEventListener('pointerdown', (e) => {
    // In preview mode, don't support drag — tap only
    if (sheet.classList.contains('preview-mode')) return;
    dragging = true;
    startY = e.clientY;
    startHeight = sheet.getBoundingClientRect().height;
    sheet.style.transition = 'none';
    handle.setPointerCapture(e.pointerId);
  });

  handle.addEventListener('pointermove', (e) => {
    if (!dragging || sheet.classList.contains('preview-mode')) return;
    const dy = startY - e.clientY;
    const newH = Math.max(100, Math.min(window.innerHeight * 0.85, startHeight + dy));
    sheet.style.height = newH + 'px';
  });

  handle.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    sheet.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    const h = sheet.getBoundingClientRect().height;
    const mid = window.innerHeight * 0.4;
    if (h > mid) {
      sheet.classList.add('expanded');
    } else {
      sheet.classList.remove('expanded');
    }
    sheet.style.height = '';
  });

  // Tap to expand/collapse, or dismiss preview
  handle.addEventListener('click', (e) => {
    if (sheet.classList.contains('preview-mode')) {
      e.preventDefault();
      dismissQuickView();
      return;
    }
    sheet.classList.toggle('expanded');
  });
}

function collapseSheet() {
  const sheet = document.getElementById('sheet');
  sheet.classList.remove('expanded');
}

function expandSheet() {
  const sheet = document.getElementById('sheet');
  sheet.classList.add('expanded');
}

// ── Venue list ─────────────────────────
function renderVenueList() {
  const list = document.getElementById('venueList');
  if (!list) return;

  const filtered = activeFilter
    ? venues.filter(v => v.category === activeFilter)
    : venues;

  // Sort by distance if we have user location
  if (userLocation) {
    filtered.sort((a, b) => {
      const da = distance(userLocation.lat, userLocation.lng, a.lat, a.lng);
      const db = distance(userLocation.lat, userLocation.lng, b.lat, b.lng);
      return da - db;
    });
  }

  let html = '';

  if (filtered.length === 0) {
    html = '<div style="text-align:center;padding:30px;color:var(--grey-400)">No venues found</div>';
  } else {
    filtered.forEach(v => {
      const icon = CATEGORIES[v.category]?.icon || '🐕';
      const dist = formatDistance(v);
      html += `
        <div class="venue-row" data-id="${v.id}">
          <div class="venue-icon ${v.category}">${icon}</div>
          <div class="venue-info">
            <div class="venue-name">${v.name}</div>
            <div class="venue-detail">${v.address}</div>
          </div>
          <div class="venue-distance">${dist || ''}</div>
        </div>
      `;
    });
  }

  list.innerHTML = html;

  // Bind taps
  list.querySelectorAll('.venue-row').forEach(row => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const venue = venues.find(v => v.id === row.dataset.id);
      if (venue) {
        const marker = markers.find(m => m.venueId === venue.id);
        if (marker) selectMarker(marker);
        showQuickView(venue);
      }
    });
  });

  // Append suggest row (use insertAdjacentHTML so we don't destroy event listeners)
  const existingSuggest = list.querySelector('.suggest-row');
  if (existingSuggest) existingSuggest.remove();
  list.insertAdjacentHTML('beforeend', `
    <div class="suggest-row" id="suggestRow">
      + Suggest a venue
    </div>
  `);
  document.getElementById('suggestRow').addEventListener('click', openSuggestModal);

  updateSheetCount();
}

function updateSheetCount() {
  const count = document.getElementById('sheetCount');
  if (!count) return;
  const filtered = activeFilter
    ? venues.filter(v => v.category === activeFilter)
    : venues;
  count.textContent = `${filtered.length} place${filtered.length !== 1 ? 's' : ''}`;
}

// ── Quick view (sheet preview) ──────────
function showQuickView(venue) {
  activeVenueId = venue.id;

  const icon = CATEGORIES[venue.category]?.icon || '🐕';
  const catLabel = CATEGORIES[venue.category]?.label || venue.category;

  let tagsHtml = '';
  if (venue.tags) {
    venue.tags.slice(0, 3).forEach(t => {
      tagsHtml += `<span class="detail-tag">${t}</span>`;
    });
  }

  const dist = formatDistance(venue);

  const sheet = document.getElementById('sheet');
  const header = document.getElementById('sheetHeader');
  const list = document.getElementById('venueList');
  const footer = document.getElementById('sheetFooter');
  const quickView = document.getElementById('quickView');

  // Populate quick view
  quickView.innerHTML = `
    <div class="qv-header">
      <div class="qv-icon ${venue.category}">${icon}</div>
      <div class="qv-title-row">
        <div class="qv-name">${venue.name}</div>
        <div class="qv-category">${catLabel}${dist ? ` · ${dist}` : ''}</div>
      </div>
      <button class="qv-close" aria-label="Close">✕</button>
    </div>
    <div class="qv-policy">${venue.dogPolicy}</div>
    ${tagsHtml ? `<div class="detail-tags" style="margin-top:8px;">${tagsHtml}</div>` : ''}
    <div class="qv-actions">
      <button class="detail-btn primary qv-more-btn">More info</button>
      <button class="detail-btn secondary qv-dir-btn">📍</button>
    </div>
  `;

  // Bind events with addEventListener (not inline onclick)
  quickView.querySelector('.qv-close').addEventListener('click', dismissQuickView);
  quickView.querySelector('.qv-more-btn').addEventListener('click', () => {
    openDetailFromQuickView(venue);
  });
  quickView.querySelector('.qv-dir-btn').addEventListener('click', () => {
    openDirections(venue.lat, venue.lng);
  });

  // Switch sheet to preview mode
  sheet.classList.add('expanded', 'preview-mode');
  sheet.style.transition = 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
  sheet.style.height = Math.min(window.innerHeight * 0.42, 380) + 'px';

  header.innerHTML = '';
  footer.style.display = 'none';
  list.style.display = 'none';
  quickView.style.display = 'block';
  quickView.scrollTop = 0;

  // Dim the map to signal focus mode
  document.getElementById('mapDim').classList.add('active');

  // Update URL
  const url = new URL(window.location);
  url.searchParams.set('venue', venue.id);
  window.history.replaceState({}, '', url);
}

function openDetailFromQuickView(venue) {
  // Dismiss quick view FIRST so the sheet goes back to list mode,
  // then open full detail on top
  dismissQuickView();
  // Small delay so the dismiss animation completes before overlay appears
  setTimeout(() => showVenueDetail(venue), 150);
}

function dismissQuickView() {
  const sheet = document.getElementById('sheet');
  const list = document.getElementById('venueList');
  const quickView = document.getElementById('quickView');
  const header = document.getElementById('sheetHeader');
  const footer = document.getElementById('sheetFooter');

  sheet.classList.remove('preview-mode');
  sheet.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  sheet.style.height = '25vh';

  list.style.display = '';
  quickView.style.display = 'none';
  footer.style.display = '';
  header.innerHTML = `
    <span>Nearby dog-friendly places</span>
    <span class="sheet-count" id="sheetCount"></span>
  `;

  // After transition, clean up inline styles
  setTimeout(() => {
    sheet.classList.remove('expanded');
    sheet.style.transition = '';
    sheet.style.height = '';
  }, 310);

  document.getElementById('mapDim').classList.remove('active');
  deselectAll();

  const url = new URL(window.location);
  url.searchParams.delete('venue');
  window.history.replaceState({}, '', url);

  activeVenueId = null;
  updateSheetCount();
}

// ── Venue detail (full screen) ──────────
function showVenueDetail(venue) {
  activeVenueId = venue.id;

  const icon = CATEGORIES[venue.category]?.icon || '🐕';
  const catLabel = CATEGORIES[venue.category]?.label || venue.category;

  let tagsHtml = '';
  if (venue.tags) {
    venue.tags.forEach(t => {
      tagsHtml += `<span class="detail-tag">${t}</span>`;
    });
  }

  let actionsHtml = '';
  if (venue.website) {
    actionsHtml += `<button class="detail-btn primary" onclick="window.open('${venue.website.replace(/'/g, "\\'")}', '_blank')">🌐 Website</button>`;
  }
  actionsHtml += `<button class="detail-btn secondary" onclick="openDirections(${venue.lat}, ${venue.lng})">📍 Directions</button>`;

  let dist = formatDistance(venue);
  let addressLine = venue.address;
  if (dist) addressLine += ` · ${dist}`;

  const html = `
    <div class="detail-handle-row">
      <button class="detail-back" onclick="closeDetail()">← Back</button>
    </div>
    <div class="detail-content">
      <div class="detail-title">${icon} ${venue.name}</div>
      <div class="detail-category">${catLabel}</div>

      <div class="detail-section">
        <div class="detail-section-label">Address</div>
        <div class="detail-section-text">${addressLine}</div>
      </div>

      <div class="detail-section">
        <div class="detail-section-label">Dog Policy</div>
        <div class="detail-section-text">${venue.dogPolicy}</div>
        ${tagsHtml ? `<div class="detail-tags">${tagsHtml}</div>` : ''}
      </div>

      <div class="detail-actions">
        ${actionsHtml}
      </div>

      <div class="amble-cta">
        <div class="amble-cta-text">🐕 Need a dog walker while you're here? Amble Dogs offers solo and small-group walks in Margate.</div>
        <a class="amble-cta-link" href="https://ambledogs.co.uk" target="_blank">Visit Amble Dogs →</a>
      </div>

      <div style="font-size:11px;color:var(--grey-400);margin-top:12px;text-align:center;">
        Source: ${venue.source || 'Community'}${venue.verified ? ' · Verified ' + venue.verified : ''}
      </div>
    </div>
  `;

  const view = document.getElementById('detailView');
  view.innerHTML = html;

  // Update URL for sharing
  const url = new URL(window.location);
  url.searchParams.set('venue', venue.id);
  window.history.replaceState({}, '', url);

  // Show
  requestAnimationFrame(() => {
    view.classList.add('open');
  });
}

function closeDetail() {
  const view = document.getElementById('detailView');
  view.classList.remove('open');
  deselectAll();

  // Ensure quick view is dismissed if it was left open
  const sheet = document.getElementById('sheet');
  if (sheet.classList.contains('preview-mode')) {
    dismissQuickView();
  }

  // Clear URL param
  const url = new URL(window.location);
  url.searchParams.delete('venue');
  window.history.replaceState({}, '', url);

  activeVenueId = null;
}

// ── Near Me ────────────────────────────
let userMarker = null;

function locateMe() {
  const btn = document.getElementById('btnNearMe');
  if (!btn) return;

  btn.classList.add('locating');

  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser');
    btn.classList.remove('locating');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };

      // Remove previous user marker if it exists
      if (userMarker) map.removeLayer(userMarker);

      // Pulsing user dot (CSS-animated circle)
      userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 8,
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.3,
        weight: 3,
        className: 'user-location-pulse',
      }).addTo(map);

      // Solid inner dot
      L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 4,
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 1,
        weight: 2,
      }).addTo(map);

      // Accuracy circle
      if (pos.coords.accuracy) {
        L.circle([userLocation.lat, userLocation.lng], {
          radius: pos.coords.accuracy,
          color: '#3B82F6',
          fillColor: '#3B82F6',
          fillOpacity: 0.05,
          weight: 1,
          dashArray: '4 4',
        }).addTo(map);
      }

      map.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 0.6 });
      renderVenueList();
      btn.classList.remove('locating');
    },
    (err) => {
      const msg = err.code === 1 ? 'Location access was denied. Enable it in your browser settings.'
        : err.code === 2 ? 'Could not determine your location. Try again.'
        : 'Location request timed out. Try again.';
      alert(msg);
      btn.classList.remove('locating');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

// ── Directions ─────────────────────────
function openDirections(lat, lng) {
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  if (isIOS) {
    window.open(`https://maps.apple.com/?daddr=${lat},${lng}`);
  } else {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
  }
}

// ── Suggest venue ──────────────────────
function openSuggestModal() {
  const modal = document.getElementById('suggestModal');
  modal.classList.add('open');
}

function closeSuggestModal() {
  const modal = document.getElementById('suggestModal');
  modal.classList.remove('open');
}

function submitSuggestion() {
  const name = document.getElementById('suggestName').value.trim();
  const category = document.getElementById('suggestCategory').value;
  const policy = document.getElementById('suggestPolicy').value.trim();

  if (!name) { alert('Please enter a venue name'); return; }

  // Construct mailto link with the suggestion data
  const subject = `Venue Suggestion: ${name}`;
  const body = `Name: ${name}\nCategory: ${category}\nDog policy: ${policy}\n\n--\nSubmitted via Dog-Friendly Margate map`;
  window.location.href = `mailto:hello@ambledogs.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  closeSuggestModal();

  // Clear form
  document.getElementById('suggestName').value = '';
  document.getElementById('suggestCategory').value = 'pub';
  document.getElementById('suggestPolicy').value = '';

  // Quick feedback
  setTimeout(() => {
    alert('Thanks! Your suggestion has been sent. We verify all submissions before adding them to the map.');
  }, 500);
}

// ── Helpers ────────────────────────────
function distance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function formatDistance(venue) {
  if (!userLocation) return null;
  const distKm = distance(userLocation.lat, userLocation.lng, venue.lat, venue.lng);
  const distMi = distKm * 0.621371;
  if (distMi < 0.1) {
    return `${Math.round(distKm * 1000)}m`;
  }
  return `${distMi.toFixed(1)} mi`;
}

// ── Boot ───────────────────────────────
document.addEventListener('DOMContentLoaded', init);
