function connectBubbles(bubbleA, bubbleB, tunnel) {
  const a = bubbleA.getBoundingClientRect();
  const b = bubbleB.getBoundingClientRect();

  // Centers of each bubble (viewport coordinates)
  const x1 = a.left + a.width / 2;
  const y1 = a.top + a.height / 2;
  const x2 = b.left + b.width / 2;
  const y2 = b.top + b.height / 2;

  // Distance & angle
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Parent rect (so we position tunnel relative to its positioned parent)
  const parentRect = tunnel.parentElement.getBoundingClientRect();

  // Position relative to parent and center vertically on the bubble centers
  const left = x1 - parentRect.left;
  const top = y1 - parentRect.top;

  tunnel.style.width = `${length}px`;
  tunnel.style.height = tunnel.style.height || '10px';
  tunnel.style.transformOrigin = '0 50%'; // rotate around left center
  tunnel.style.transform = `rotate(${angle}deg)`;
  tunnel.style.left = `${left}px`;
  // subtract half the tunnel height so the tunnel is centered vertically on the centers
  const tunnelH = parseFloat(getComputedStyle(tunnel).height) || 10;
  tunnel.style.top = `${top - tunnelH / 2}px`;
}

// Update all tunnels on resize or load
function updateTunnels() {
  const textBubble1 = document.getElementById("textBubble1");
  const textBubble2 = document.getElementById("textBubble2");
  const imageBubble1 = document.getElementById("imageBubble1");
  const imageBubble2 = document.getElementById("imageBubble2");

  const tunnel1 = document.getElementById("tunnel1");
  const tunnel2 = document.getElementById("tunnel2");

  // guard in case elements are missing
  if (textBubble1 && imageBubble1 && tunnel1) connectBubbles(textBubble1, imageBubble1, tunnel1);
  if (textBubble2 && imageBubble2 && tunnel2) connectBubbles(textBubble2, imageBubble2, tunnel2);
}

window.addEventListener("resize", updateTunnels);
window.addEventListener("load", updateTunnels);
window.addEventListener("scroll", updateTunnels);
document.addEventListener('DOMContentLoaded', updateTunnels);