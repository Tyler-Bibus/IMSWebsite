// Element References
const speed = document.getElementById('speed');
const rpmGrid = document.getElementById('rpmGrid');
const gear = document.getElementById('gear');
const lean = document.getElementById('lean');
const fuel = document.getElementById('fuel');
const dash = document.querySelector('.dash-container');
const rpmBlocks = document.querySelectorAll('.rpm-block');
const fuelFill = document.getElementById('fuelFill');
const fuelLabel = document.getElementById('fuelLabel');
const leanCanvas = document.getElementById('leanCanvas');
const leanCtx = leanCanvas.getContext('2d');

// Lean Angle Drawing Function
function drawLeanAngle(angle, color) {
    angle = angle; // Adjust for 0° at top
    leanCtx.clearRect(0, 0, 80, 80);
    leanCtx.strokeStyle = color;
    leanCtx.lineWidth = 2;

    // Draw semicircle (180° arc)
    leanCtx.beginPath();
    leanCtx.arc(40, 40, 35, Math.PI, 0, false); // Top semicircle
    leanCtx.stroke();

    // Draw lean line
    const rad = (angle * Math.PI) / 180; // Convert degrees to radians
    const x = 40 + 35 * Math.cos(Math.PI - rad); // Adjust for 0° at top
    const y = 40 - 35 * Math.sin(Math.PI - rad);
    leanCtx.beginPath();
    leanCtx.moveTo(40, 40); // Center
    leanCtx.lineTo(x, y);
    leanCtx.stroke();
}

// Initial Lean Angle
drawLeanAngle(90, '#ff0000');

// Toggle Event Listeners
document.getElementById('speedToggle').addEventListener('change', (e) => {
    speed.style.display = e.target.checked ? 'flex' : 'none';
});
document.getElementById('rpmToggle').addEventListener('change', (e) => {
    rpmGrid.style.display = e.target.checked ? 'flex' : 'none';
});
document.getElementById('gearToggle').addEventListener('change', (e) => {
    gear.style.display = e.target.checked ? 'flex' : 'none';
});
document.getElementById('leanToggle').addEventListener('change', (e) => {
    lean.style.display = e.target.checked ? 'block' : 'none';
});
document.getElementById('fuelToggle').addEventListener('change', (e) => {
    fuel.style.display = e.target.checked ? 'block' : 'none';
});

// Color Picker Event Listeners
document.getElementById('accentColor').addEventListener('input', (e) => {
    const color = e.target.value;
    dash.style.borderColor = color;
    speed.style.borderColor = color;
    speed.style.color = color;
    gear.style.borderColor = color;
    gear.style.color = color;
    fuel.style.borderColor = color;
    fuelFill.style.backgroundColor = color;
    fuelLabel.style.color = color;
    rpmBlocks.forEach(block => {
        block.style.borderColor = color;
        if (block.classList.contains('rpm-active')) {
            block.style.backgroundColor = color;
        }
    });
    drawLeanAngle(document.getElementById('leanAngle').value, color); // Update lean color
});
document.getElementById('bgColor').addEventListener('input', (e) => {
    dash.style.backgroundColor = e.target.value;
});

// Lean Angle Slider
document.getElementById('leanAngle').addEventListener('input', (e) => {
    let angle = parseFloat(e.target.value) + 90;
    let accentColor = document.getElementById('accentColor').value;
    drawLeanAngle(angle, accentColor);
});