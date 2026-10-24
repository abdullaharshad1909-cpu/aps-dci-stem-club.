/**
 * APS DCI DEFENCE COMPLEX STEM - HYBRID CANVAS ENGINE
 * Dual-Mode: 1) Tactical Radar & Constellation Telemetry
 *            2) Cyber Matrix Digital Code Rain
 */

(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let activeMode = 'radar'; // 'radar' or 'matrix'
    let animationFrameId = null;

    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        if (activeMode === 'radar') initRadarNodes();
        if (activeMode === 'matrix') initMatrixColumns();
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    /* ========================================================
       MODE 1: TACTICAL RADAR & CONSTELLATION NETWORK
       ======================================================== */
    let nodes = [];
    const maxNodes = 65;
    const connectionDist = 125;
    let radarSweepAngle = 0;

    class TelemetryNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.isSpecial = Math.random() > 0.82;
            this.code = this.isSpecial ? "DCI-NODE-" + Math.floor(Math.random() * 899 + 100) : null;
            this.radius = this.isSpecial ? 2.5 : 1.5;
            this.color = this.isSpecial ? '#d4af37' : '#00f0ff'; // Gold or Cyan
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse proximity interaction (magnetic repulsion/swirl)
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * 1.5;
                this.y -= Math.sin(angle) * 1.5;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            if (this.isSpecial && width > 768) {
                ctx.font = '9px "JetBrains Mono", monospace';
                ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
                ctx.fillText(this.code, this.x + 6, this.y + 3);
            }
        }
    }

    function initRadarNodes() {
        nodes = [];
        for (let i = 0; i < maxNodes; i++) {
            nodes.push(new TelemetryNode());
        }
    }

    function renderRadarMode() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    const alpha = (1 - dist / connectionDist) * 0.22;
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.65;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw mouse connections
        if (mouse.x > 0 && mouse.y > 0) {
            for (let i = 0; i < nodes.length; i++) {
                const dx = mouse.x - nodes[i].x;
                const dy = mouse.y - nodes[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    const alpha = (1 - dist / 160) * 0.45;
                    ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(nodes[i].x, nodes[i].y);
                    ctx.stroke();
                }
            }
        }

        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
            nodes[i].draw();
        }

        // Tactical ambient radar beam in center
        radarSweepAngle += 0.012;
        const centerX = width * 0.75;
        const centerY = height * 0.45;
        const radarRadius = Math.min(width, height) * 0.28;

        if (width > 900) {
            ctx.save();
            ctx.translate(centerX, centerY);
            
            // Soft background radar rings
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, radarRadius * 0.35, 0, Math.PI * 2);
            ctx.arc(0, 0, radarRadius * 0.7, 0, Math.PI * 2);
            ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Sweep wedge
            const grad = ctx.createConicGradient(radarSweepAngle, 0, 0);
            grad.addColorStop(0, 'rgba(0, 255, 136, 0.12)');
            grad.addColorStop(0.12, 'rgba(0, 240, 255, 0.04)');
            grad.addColorStop(0.2, 'rgba(0, 240, 255, 0)');
            grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    /* ========================================================
       MODE 2: CYBER MATRIX DIGITAL CODE RAIN
       ======================================================== */
    const matrixChars = "01010101APSCDCIΩλπΣΔΨΦθΞ∇abcdef0123456789ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ".split('');
    const fontSize = 14;
    let matrixColumns = [];

    function initMatrixColumns() {
        const cols = Math.floor(width / fontSize);
        matrixColumns = [];
        for (let i = 0; i < cols; i++) {
            matrixColumns.push({
                y: Math.random() * -100,
                speed: 1 + Math.random() * 2,
                chars: []
            });
        }
    }

    function renderMatrixMode() {
        // Semi-transparent fade for classic phosphorescent tail
        ctx.fillStyle = 'rgba(3, 7, 18, 0.14)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < matrixColumns.length; i++) {
            const col = matrixColumns[i];
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = col.y * fontSize;

            // Head character is glowing white/bright gold, tail is matrix green/cyan
            ctx.fillStyle = Math.random() > 0.9 ? '#ffffff' : (i % 3 === 0 ? '#00f0ff' : '#00ff88');
            ctx.fillText(char, x, y);

            if (y > height && Math.random() > 0.975) {
                col.y = 0;
            }
            col.y += col.speed * 0.45;
        }
    }

    /* ========================================================
       ANIMATION LOOP & MODE SWITCHING API
       ======================================================== */
    function animate() {
        if (activeMode === 'radar') {
            renderRadarMode();
        } else if (activeMode === 'matrix') {
            renderMatrixMode();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize
    initRadarNodes();
    initMatrixColumns();
    animate();

    // Global Public API
    window.canvasEngine = {
        getMode: () => activeMode,
        setMode: (mode) => {
            if (mode === activeMode) return;
            activeMode = mode;
            ctx.clearRect(0, 0, width, height);
            if (activeMode === 'matrix') {
                initMatrixColumns();
            } else {
                initRadarNodes();
            }
            // Update any indicator badges
            const badge = document.getElementById('canvas-mode-indicator');
            if (badge) {
                badge.textContent = activeMode === 'radar' ? 'RADAR TELEMETRY' : 'DIGITAL MATRIX';
            }
        },
        toggleMode: () => {
            const nextMode = activeMode === 'radar' ? 'matrix' : 'radar';
            window.canvasEngine.setMode(nextMode);
            return nextMode;
        }
    };

    window.toggleCanvasMode = window.canvasEngine.toggleMode;
    window.setCanvasMode = window.canvasEngine.setMode;
})();
